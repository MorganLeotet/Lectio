/* ==== IMPORT ==== */

import { Library, Book, Author, Genre, LibraryBook } from '../models/index.js';


// on va gérer la bibliothèque du user connecté

const libraryController = {

    getMyLibrary: async (req, res) => { 
        
        try {       

            const userId = req.user.userId;             // on récupère l'id du User connecté

            const library = await Library.findOne({     // on cherche la bibliothèque du User
                where: { id_user: userId },
                include: [                                  // on inclut les livres liés à la bibliothèque
                    {
                        model: Book,

                        
                        through: {
                            model: LibraryBook,
                            attributes: ['reading_status'],       // on récupère le statut de lecture depuis Library_book
                        },
                        
                        include: [
                            {
                                model: Author,
                                attributes: ['id_author', 'name'],
                            },
                        ],
                    },
                ],
            });

            if (!library) {                 // si le User n'a pas encore de bibliothèque
            return res.json([]);            // bibliothèque vide
            }

        // réponse propre en JSON

            const cleanBooks = library.Books.map(book => ({         // on parcourt chaque livre de la bibliothèque
                id_book: book.id_book,
                title: book.title,
                author: book.Author?.name || null,
                reading_status: book.LibraryBook.reading_status
            }));

            return res.json(cleanBooks);

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: 'Erreur Serveur'
            });
        }
    },

    addBookToLibrary: async (req, res) => {

        try {

            const userId = req.user.userId;             // Récupère id du User depuis le JWT

            const { id_book, reading_status } = req.body;       // récupère les données du body

            if (!id_book) {
                return res.status(400).json({
                    message: 'id_book obligatoire'
                });
            }

            const library = await Library.findOne({         // récupère la bibliothèque du User
                where: { id_user: userId }
            });

            if (!library) {
                return res.status(404).json({
                    message: 'Bibliothèque introuvable'
                });
            }

            const book = await Book.findByPk(id_book);       // vérif que le livre existe

            if (!book) {                        
                return res.status(404).json({
                    message: 'Livre introuvable'
                });
            }

            const alreadyExists = await LibraryBook.findOne({       // vérif si le livre est déjà dans la bibliothèque
                    where: {
                        id_library: library.id_library,
                        id_book: id_book
                    }
            });

            if (alreadyExists) {
                return res.status(409).json({
                    message: 'Livre déjà dans la bibliothèque'
                });
            }

            await LibraryBook.create({              // on ajoute le livre à la bibliothèque
                id_library: library.id_library,
                id_book: id_book,
                reading_status: reading_status || 'A Lire'
            });

            return res.status(201).json({               // réponse ok
                message: 'Livre ajouté à la bibliothèque'
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: 'Erreur Serveur'
            })
        }
    },

    updateReadingStatus: async (req, res) => {

        try {

            const userId = req.user.userId;         // Récupère id du User depuis le JWT
            
            const bookId = req.params;               // récupère id du Livre depuis URL

            const { reading_status } = req.body;            // nouveau statut envoyé du Front

            const ALLOWED_READING_STATUS = ['A Lire', 'En Cours', 'Lu'];     // vérif du statut de lecture

            if (!ALLOWED_READING_STATUS.includes(reading_status)) {
                return res.status(400).json({
                    message: 'Statut de lecture invalide'
                });
            }

            const library = await Library.findOne({             // on récupère la bibli du user
                where: { id_user: userId },
            });

            if (!library) {
                return res.status(404).json({
                    message: 'Bibliothèque introuvable'
                });
            }

            const libraryBook = await LibraryBook.findOne({         // on cherche la relation dans table pivot
                where: {
                    id_library: library.id_library,
                    id_book: bookId,
                },
            });

            if (!libraryBook) {
                return res.status(404).json({
                    message: 'Livre non présent dans la bibliothèque'
                });
            }

            libraryBook.reading_status = reading_status;        // mis à jour du statut de lecture
            await libraryBook.save();

            return res.json({                                   // réponse ok
                message: 'Statut de lecture mis à jour',
                reading_status,
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: 'Erreur Serveur',
            });
        }
    },

    updateLibraryName: async (req, res) => {

        try {
            const userId = req.user.userId;
            const { name } = req.body;

            if (!name) {
                return res.status(400).json({
                    message: 'Nom manquant'
                });
            }
            const library = await Library.findOne({
                where: {id_user: userId }
            });

            if (!library) {
                return res.status(404).json({
                    message: 'Bibliothèque introuvable'
                });
            }
            library.name = name;
            await library.save();

            return res.json({
                message: 'Nom de la bibliothèque mis à jour',
                name: library.name
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: 'Erreur Serveur'
            });
        }
    },

    deleteBookFromLibrary: async (req, res) => {

        try {
            
            const userId = req.user.userId;             // User connecté

            const bookId = req.params.bookId;                  // Livre à retirer

            const library = await Library.findOne({     // récup de la bibliothèque du User
                where: { id_user: userId },
            });

            if (!library) {
                return res.status(404).json({
                    message: 'Bibliothèque introuvable'
                });
            }

            const libraryBook = await LibraryBook.findOne({     // vérif si livre est dans la bibliothèque

                where: {
                    id_library: library.id_library,
                    id_book: bookId
                }
            });

            if (!libraryBook) {
            return res.status(404).json({
                message: 'Livre non présent dans la bibliothèque'
            });
            }

            await libraryBook.destroy();        // suppression

            return res.json({
                message: 'Livre retiré de la bibliothèque'
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: 'Erreur Serveur'
            });
        }
    }
        
};

/* ==== EXPORT ==== */

export default libraryController;