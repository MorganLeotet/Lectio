/* ==== IMPORT ==== */

import fetch from "node-fetch";
import { Library, LibraryBook } from "../models/index.js";

/* ==== CONTROLLER ==== */

const libraryController = {

  /* ============================= */
  /* GET USER LIBRARY              */
  /* ============================= */

// on récupère la bibliothèque de l'utilisateur connecté
    async getMyLibrary(req, res) {

        try {
        
        // on récupère l'id de l'utilisateur
            const userId = req.userId;
        // on cherche sa bibliothèque
            const library = await Library.findOne({
                where: { id_user: userId }
            });
        // si pas de bibliothèque, on retourne un tableau vide
            if (!library) {
                return res.json([]);
            }
        // on récupère les livres de la bilbiothèque
            const libraryBooks = await LibraryBook.findAll({
                where: { id_library: library.id_library }
            });
        // on récupère les id google books 
            const googleIds = libraryBooks
                .map(b => b.google_book_id)
                .filter(Boolean);
        // on enrichit chaque livre avec les données google books
            const books = await Promise.all(
            
                libraryBooks.map(async (b) => {
                
                // on appel l'api pour récupérer les infos d'un livre
                    const response = await fetch(
                        `https://www.googleapis.com/books/v1/volumes/${b.google_book_id}`
                    );

                    const data = await response.json();
                // si aucune donnée valide, on ignore le livre
                    if (!data.volumeInfo) return null;
                // on fusionne donnée api + statut de lecture
                    return {
                    ...data,
                    reading_status: b.reading_status 
                    };

                })

            );
        // supprime les livres invalides
            const validBooks = books.filter(b => b !== null);
        // on retourne la bibliothèque en json
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
        
        // on récupère l'id utilisateur
            const userId = req.userId;
        // on récupère les données envoyées dans la requête
            const { google_book_id, reading_status } = req.body;
        // on vérifie que l'id du livre
            if (!google_book_id) {
                return res.status(400).json({
                    message: "google_book_id obligatoire"
                });
            }
        // on cherche la bibliothèque de l'utilisateur
            const library = await Library.findOne({
                where: { id_user: userId }
            });
        // si pas de bibliothèque, message erreur
            if (!library) {
                return res.status(404).json({
                    message: "Bibliothèque introuvable"
                });
            }
        // on vérifie si le livre est déjà présent
            const alreadyExists = await LibraryBook.findOne({
                where: {
                    id_library: library.id_library,
                    google_book_id
                }
            });
        // si livre déjà présent, message erreur
            if (alreadyExists) {
                return res.status(409).json({
                    message: "Livre déjà dans la bibliothèque"
                });
            }
        // on créer le livre dans la bibliothèque
            await LibraryBook.create({
                id_library: library.id_library,
                google_book_id,
                reading_status: reading_status || "to_read"
            });
        // réponse 
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
    // on récupère l'id du livre depuis l'url
        const google_book_id = req.params.google_book_id;
    // on récupère le nouveau statut de lecture envoyé dans la requête
        const { reading_status } = req.body;
    // liste des statuts autorisés
        const allowedStatus = ["to_read", "reading", "read"];

        console.log("STATUS RECU:", reading_status);

    // on vérifie le statut de lecture
        if (!allowedStatus.includes(reading_status)) {
            return res.status(400).json({
                message: "Statut de lecture invalide"
            });
        }
    // on cherche la bibliothèque de l'utilisateur
        const library = await Library.findOne({
            where: { id_user: userId }
        });
    // si pas de bibliothèque, message erreur
        if (!library) {
            return res.status(404).json({
                message: "Bibliothèque introuvable"
            });
        }
    // on cherche un livre dans la bibliothèque
        const libraryBook = await LibraryBook.findOne({
            where: {
                id_library: library.id_library,
                google_book_id
            }
        });
    // si pas de livre, message erreur
        if (!libraryBook) {
            return res.status(404).json({
                message: "Livre non présent dans la bibliothèque"
            });
        }
    // on met à jour le statut de lecture
        libraryBook.reading_status = reading_status;
    // on sauvegarde en base
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
        // on supprime le livre en base
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
    // on récupère le nouveau "name" depuis la requête
        const { name } = req.body;

        const library = await Library.findOne({
            where: { id_user: userId }
        });

        if (!library) {
            return res.status(404).json({
                message: "Bibliothèque introuvable"
            });
        }
    // on met à jour le "name"
        library.name = name;
    // on sauvegarde ne base
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