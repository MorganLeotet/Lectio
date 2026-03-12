/* ==== IMPORT ==== */

import fetch from "node-fetch";
import { Library, LibraryBook } from "../models/index.js";

/* ==== CONTROLLER ==== */

const libraryController = {

  /* ============================= */
  /* GET USER LIBRARY              */
  /* ============================= */

    async getMyLibrary(req, res) {

        try {

            const userId = req.userId;

            const library = await Library.findOne({
                where: { id_user: userId }
            });

            if (!library) {
                return res.json([]);
            }

            const libraryBooks = await LibraryBook.findAll({
                where: { id_library: library.id_library }
            });

            const googleIds = libraryBooks
                .map(b => b.google_book_id)
                .filter(Boolean);

            const books = await Promise.all(

                googleIds.map(async (id) => {

                    const response = await fetch(
                        `https://www.googleapis.com/books/v1/volumes/${id}`
                    );

                    const data = await response.json();

                    return data.volumeInfo ? data : null;

                })

            );

            const validBooks = books.filter(b => b !== null);

            res.json(validBooks);

        } catch (error) {

            console.error(error);

            res.status(500).json({
                message: "Erreur serveur"
            });

        }

    },

    /* ============================= */
    /* ADD BOOK TO LIBRARY           */
    /* ============================= */

    async addBookToLibrary(req, res) {

        try {

            const userId = req.userId;

            const { google_book_id, reading_status } = req.body;

            if (!google_book_id) {
                return res.status(400).json({
                    message: "google_book_id obligatoire"
                });
            }

            const library = await Library.findOne({
                where: { id_user: userId }
            });

            if (!library) {
                return res.status(404).json({
                    message: "Bibliothèque introuvable"
                });
            }

            const alreadyExists = await LibraryBook.findOne({
                where: {
                    id_library: library.id_library,
                    google_book_id
                }
            });

            if (alreadyExists) {
                return res.status(409).json({
                    message: "Livre déjà dans la bibliothèque"
                });
            }

            await LibraryBook.create({
                id_library: library.id_library,
                google_book_id,
                reading_status: reading_status || "A Lire"
            });

            res.status(201).json({
                message: "Livre ajouté à la bibliothèque"
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                message: "Erreur serveur"
            });

        }

    },

    /* ============================= */
    /* UPDATE READING STATUS         */
    /* ============================= */

    async updateReadingStatus(req, res) {

    try {

        const userId = req.userId;
        const google_book_id = req.params.google_book_id;

        const { reading_status } = req.body;

        const allowedStatus = ["A Lire", "En Cours", "Lu"];

        if (!allowedStatus.includes(reading_status)) {
            return res.status(400).json({
                message: "Statut de lecture invalide"
            });
        }

        const library = await Library.findOne({
            where: { id_user: userId }
        });

        if (!library) {
            return res.status(404).json({
                message: "Bibliothèque introuvable"
            });
        }

        const libraryBook = await LibraryBook.findOne({
            where: {
                id_library: library.id_library,
                google_book_id
            }
        });

        if (!libraryBook) {
            return res.status(404).json({
                message: "Livre non présent dans la bibliothèque"
            });
        }

        libraryBook.reading_status = reading_status;

        await libraryBook.save();

        res.json({
            message: "Statut de lecture mis à jour",
            reading_status
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Erreur serveur"
        });

    }

},

    /* ============================= */
    /* DELETE BOOK FROM LIBRARY      */
    /* ============================= */

    async deleteBookFromLibrary(req, res) {

        try {

            const userId = req.userId;
            const google_book_id = req.params.google_book_id;

            const library = await Library.findOne({
                where: { id_user: userId }
            });

            if (!library) {
                return res.status(404).json({
                    message: "Bibliothèque introuvable"
                });
            }

            const libraryBook = await LibraryBook.findOne({
                where: {
                    id_library: library.id_library,
                    google_book_id
                }
            });

            if (!libraryBook) {
                return res.status(404).json({
                    message: "Livre non présent dans la bibliothèque"
                });
            }

            await libraryBook.destroy();

            res.json({
                message: "Livre retiré de la bibliothèque"
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                message: "Erreur serveur"
            });

        }

    },

        async updateLibraryName(req, res) {

    try {

        const userId = req.userId;
        const { name } = req.body;

        const library = await Library.findOne({
            where: { id_user: userId }
        });

        if (!library) {
            return res.status(404).json({
                message: "Bibliothèque introuvable"
            });
        }

        library.name = name;

        await library.save();

        res.json({
            message: "Nom de la bibliothèque mis à jour",
            name: library.name
        });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                message: "Erreur serveur"
            });

        }

    }
}

export default libraryController;