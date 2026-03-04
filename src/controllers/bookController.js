/* ==== IMPORT ==== */

import { Book, Author, Genre } from "../models/index.js";

/* ==== CONTROLLER ==== */

const bookController = {

  /* ============================= */
  /* GET ALL BOOKS                 */
  /* ============================= */

    getAllBooks: async (req, res) => {

        try {

        const books = await Book.findAll({

            attributes: ["id_book", "title"],

            include: [
            {
                model: Author,
                attributes: ["id_author", "name"]
            },
            {
                model: Genre,
                attributes: ["id_genre", "name"],
                through: { attributes: [] }
            }
            ]
        });

        return res.json(books);

        } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Erreur serveur"
        });

        }

    },


    /* ============================= */
    /* GET BOOK BY ID                */
    /* ============================= */

    getBookById: async (req, res) => {

        try {

        const bookId = parseInt(req.params.id, 10);

        if (isNaN(bookId)) {
            return res.status(400).json({
            message: "ID invalide"
            });
        }

        const book = await Book.findByPk(bookId, {

            attributes: ["id_book", "title"],

            include: [
            {
                model: Author,
                attributes: ["id_author", "name"]
            },
            {
                model: Genre,
                attributes: ["id_genre", "name"],
                through: { attributes: [] }
            }
            ]
        });

        if (!book) {
            return res.status(404).json({
            message: "Livre non trouvé"
            });
        }

        return res.json(book);

        } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Erreur serveur"
        });

        }

    },


    /* ============================= */
    /* CREATE BOOK                   */
    /* ============================= */

    createBook: async (req, res) => {

        try {

        const { title, id_author, genreIds } = req.body;

        if (!title?.trim() || !id_author) {
            return res.status(400).json({
            message: "Titre et auteur obligatoires"
            });
        }

        const author = await Author.findByPk(id_author);

        if (!author) {
            return res.status(404).json({
            message: "Auteur non trouvé"
            });
        }

        const book = await Book.create({
            title,
            id_author
        });

        if (Array.isArray(genreIds) && genreIds.length > 0) {

            const genres = await Genre.findAll({
            where: { id_genre: genreIds }
            });

            await book.setGenres(genres);

        }

        const createdBook = await Book.findByPk(book.id_book, {

            attributes: ["id_book", "title"],

            include: [
            {
                model: Author,
                attributes: ["id_author", "name"]
            },
            {
                model: Genre,
                attributes: ["id_genre", "name"],
                through: { attributes: [] }
            }
            ]
        });

        return res.status(201).json({
            message: "Livre créé avec succès",
            data: createdBook
        });

        } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Erreur serveur"
        });

        }

    },


    /* ============================= */
    /* UPDATE BOOK                   */
    /* ============================= */

    updateBook: async (req, res) => {

        try {

        const bookId = parseInt(req.params.id, 10);

        if (isNaN(bookId)) {
            return res.status(400).json({
            message: "ID invalide"
            });
        }

        const { title, id_author, genreIds } = req.body;

        const book = await Book.findByPk(bookId);

        if (!book) {
            return res.status(404).json({
            message: "Livre non trouvé"
            });
        }

        if (title?.trim()) {
            book.title = title;
        }

        if (id_author) {

            const author = await Author.findByPk(id_author);

            if (!author) {
            return res.status(404).json({
                message: "Auteur non trouvé"
            });
            }

            book.id_author = id_author;

        }

        await book.save();

        if (Array.isArray(genreIds)) {

            const genres = await Genre.findAll({
            where: { id_genre: genreIds }
            });

            await book.setGenres(genres);

        }

        const updatedBook = await Book.findByPk(book.id_book, {

            attributes: ["id_book", "title"],

            include: [
            {
                model: Author,
                attributes: ["id_author", "name"]
            },
            {
                model: Genre,
                attributes: ["id_genre", "name"],
                through: { attributes: [] }
            }
            ]
        });

        return res.json(updatedBook);

        } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Erreur serveur"
        });

        }

    },


    /* ============================= */
    /* DELETE BOOK                   */
    /* ============================= */

    deleteBook: async (req, res) => {

        try {

        const bookId = parseInt(req.params.id, 10);

        if (isNaN(bookId)) {
            return res.status(400).json({
            message: "ID invalide"
            });
        }

        const book = await Book.findByPk(bookId);

        if (!book) {
            return res.status(404).json({
            message: "Livre non trouvé"
            });
        }

        await book.destroy();

        return res.json({
            message: "Livre supprimé avec succès"
        });

        } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Erreur serveur"
        });

        }

    }

};

/* ==== EXPORT ==== */

export default bookController;