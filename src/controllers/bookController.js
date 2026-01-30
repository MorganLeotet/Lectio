/* ==== IMPORT ==== */

import { Book, Author, Genre } from '../models/index.js';

// Récupérer tous les livres ou filtrer par recherche

const bookController = {

    getAllBooks: async (req, res) => {

        try {
            const books = await Book.findAll({

                include: [
                    {
                        model: Author,
                        attributes: ['id_author', 'name'],
                    },
                    {
                        model: Genre,
                        attributes: ['id_genre', 'name']
                    },
                ],
            });

            return res.json(books);

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: 'Erreur serveur',
            })
        }
    },

    getBookById: async (req, res) => {

        try {

            const bookId = parseInt(req.params.id, 10);

            const book = await Book.findByPk(bookId, {
                include: [
                    {
                        model: Author,
                        attributes: ['id_author', 'name'],
                    },
                    {
                        model: Genre,
                        attributes: ['id_genre', 'name'],
                        through: { attributes: [] },
                    },
                ],
            });

            if (!book) {
                return res.status(404).json({
                    message: 'Livre non trouvé'
                });
            }
            return res.json(book);

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: 'Erreur Serveur'
            });
        }
    },

    createBook: async (req, res) => {

        try {

            const { title, id_author, genreIds } = req.body;

            if (!title || !id_author) {
                return res.status(400).json({
                    message: 'Titre et auteur obligatoires'
                });
            }

            const author = await Author.findByPk(id_author);            // on verifie l'auteur

            if(!author) {
                return res.status(404).json({
                    message: 'Auteur non trouvé'
                });
            }

            const book = await Book.create({                        // on crée le livre
                title,
                id_author,
            });

            if (Array.isArray(genreIds) && genreIds.length > 0 ) {
                
                const genres = await Genre.findAll({
                    where: {
                        id_genre: genreIds,
                    },
                });

                await book.setGenres(genres);
            }

            const createBook = await Book.findByPk(book.id_book, {
                include: [
                    { model: Author, attributes: ['id_author', 'name']},
                    { model: Genre, attributes: ['id_genre', 'name'], through: { attributes: [] } },
                ],
            });
            return res.status(201).json({
                message: 'Livre créé avec succès',
                data: createBook
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: 'Erreur Serveur'
            });
        }
    },

    deleteBook: async (req, res) => {

        try {

            const bookId = parseInt(req.params.id, 10);

            const book = await Book.findByPk(bookId);

            if (!book) {
                return res.status(404).json({
                    message: 'Livre non trouvé'
                });
            }

            await book.destroy();

            return res.json({
                message: 'Livre retiré avec succès',
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: 'Erreur Serveur'
            });
        }
    },

    updateBook: async (req, res) => {

        try {

            const bookId = parseInt(req.params.id, 10);

            const { title, id_author, genreIds } = req.body;

            const book = await Book.findByPk(bookId);

            if (!book) {
                return res.status(404).json({
                    message: 'Livre non trouvé',
                });
            }

            if (title) {                // mettre à jour les champs
                book.title = title;
            }

            if (id_author) {

                const author = await Author.findByPk(id_author);

                if (!author) {
                    return res.status(404).json({
                        message: 'Auteur non trouvé'
                    });
                }
                book.id_author = id_author;
            }

            await book.save();

            if (Array.isArray(genreIds)) {              // mettre à jour les genres 

                const genres = await Genre.findAll({
                    where: { id_genre: genreIds },
                });

                await book.setGenres(genres);
            }

            const updateBook =await Book.findByPk(book.id_book, {
                include: [
                    { model: Author, attributes: ['id_author', 'name'] },
                    { model: Genre, attributes: ['id_genre', 'name'], through: { attributes: [ ] } },
                ],
            });
            return res.json(updateBook);

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: 'Erreur Serveur'
            });
        }
    },
}


    




/* ==== EXPORT ==== */

export default bookController;
