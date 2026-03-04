/* ==== IMPORT ==== */

import { Library, Book, Author, Genre, LibraryBook } from "../models/index.js";

/* ==== CONTROLLER ==== */

const libraryController = {

  /* ============================= */
  /* GET USER LIBRARY              */
  /* ============================= */

    getMyLibrary: async (req, res) => {

    try {

        const userId = req.userId;

        const library = await Library.findOne({
            where: { id_user: userId },

            include: [
            {
                model: Book,
                attributes: ["id_book", "title"],

                through: {
                model: LibraryBook,
                attributes: ["reading_status"]
                },

                include: [
                {
                    model: Author,
                    attributes: ["id_author", "name"]
                },
                {
                    model: Genre,
                    attributes: ["id_genre", "name"]
                }
                ]
            }
            ]
        });

        if (!library) {
            return res.json([]);
        }

        const cleanBooks = (library.Books || []).map(book => ({
            id_book: book.id_book,
            title: book.title,
            author: book.Author?.name || null,
            genres: book.Genres?.map(g => g.name) || [],
            reading_status: book.LibraryBook.reading_status
        }));

        return res.json(cleanBooks);

        } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Erreur Serveur"
        });

        }
    },

    /* ============================= */
    /* ADD BOOK TO LIBRARY           */
    /* ============================= */

    addBookToLibrary: async (req, res) => {

        try {

        const userId = req.userId;

        const { id_book, reading_status } = req.body;

        if (!id_book) {
            return res.status(400).json({
            message: "id_book obligatoire"
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

        const book = await Book.findByPk(id_book);

        if (!book) {
            return res.status(404).json({
            message: "Livre introuvable"
            });
        }

        const alreadyExists = await LibraryBook.findOne({
            where: {
            id_library: library.id_library,
            id_book
            }
        });

        if (alreadyExists) {
            return res.status(409).json({
            message: "Livre déjà dans la bibliothèque"
            });
        }

        await LibraryBook.create({
            id_library: library.id_library,
            id_book,
            reading_status: reading_status || "A Lire"
        });

        return res.status(201).json({
            message: "Livre ajouté à la bibliothèque"
        });

        } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Erreur Serveur"
        });

        }
    },

    /* ============================= */
    /* UPDATE READING STATUS         */
    /* ============================= */

    updateReadingStatus: async (req, res) => {

        try {

        const userId = req.userId;
        const bookId = req.params.bookId;

        const { reading_status } = req.body;

        const ALLOWED_READING_STATUS = [
            "A Lire",
            "En Cours",
            "Lu"
        ];

        if (!ALLOWED_READING_STATUS.includes(reading_status)) {
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
            id_book: bookId
            }
        });

        if (!libraryBook) {
            return res.status(404).json({
            message: "Livre non présent dans la bibliothèque"
            });
        }

        libraryBook.reading_status = reading_status;

        await libraryBook.save();

        return res.json({
            message: "Statut de lecture mis à jour",
            reading_status
        });

        } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Erreur Serveur"
        });

        }
    },

    /* ============================= */
    /* UPDATE LIBRARY NAME           */
    /* ============================= */

    updateLibraryName: async (req, res) => {

        try {

        const userId = req.userId;

        const { name } = req.body;

        if (!name) {
            return res.status(400).json({
            message: "Nom manquant"
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

        library.name = name;

        await library.save();

        return res.json({
            message: "Nom de la bibliothèque mis à jour",
            name: library.name
        });

        } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Erreur Serveur"
        });

        }
    },

    /* ============================= */
    /* DELETE BOOK FROM LIBRARY      */
    /* ============================= */

    deleteBookFromLibrary: async (req, res) => {

        try {

        const userId = req.userId;
        const bookId = req.params.bookId;

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
            id_book: bookId
            }
        });

        if (!libraryBook) {
            return res.status(404).json({
            message: "Livre non présent dans la bibliothèque"
            });
        }

        await libraryBook.destroy();

        return res.json({
            message: "Livre retiré de la bibliothèque"
        });

        } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Erreur Serveur"
        });

        }
    }

};

/* ==== EXPORT ==== */

export default libraryController;