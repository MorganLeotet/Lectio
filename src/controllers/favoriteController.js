/* ==== IMPORT ==== */

import { User, Book } from '../models/index.js';

const favoriteController = {

    addFavorite : async (req, res) => {         // ajouter un livre en favoris

        try {

            const userId = req.user.userId;
            const { id_book } = req.body;

            const user = await User.findByPk(userId);
            const book = await Book.findByPk(id_book);

            if (!user || !book) {
                return res.status(404).json({
                    message: 'Utilisateur ou livre introuvable'
                });
            }
            
            await user.addFavorite(book);

            return res.status(201).json({
                message: 'Livre ajouté aux favoris'
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: 'Erreur Serveur'
            });
        }
    },

    deleteFavorite: async (req, res) => {

        try {

            const userId = req.user.userId;
            const { id_book } = req.params;

            const user = await User.findByPk(userId);
            const book = await Book.findByPk(id_book);

            if (!book) {
                return res.status(404).json({
                    message: 'Livre introuvable'
                });
            }
            await user.removeFavorite(book);

            return res.json({
                message: 'Livre retiré des favoris'
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: 'Erreur Serveur'
            });
        }
    },

    getfavorite: async (req, res) => {

        try {

            const userId = req.user.userId;

            const user = await User.findByPk(userId, {
                include: [
                    {
                        model: Book,
                        as: 'favorites',
                        attributes: ['id_book', 'title'],
                    }
                ]
            });

            if (!user) {
                return res.status(404).json({
                    message: 'Utilisateur introuvable'
                });
            }

            return res.json(user.favorites);

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: 'Erreur Serveur'
            });
        }
    },
};

/* ==== EXPORT ==== */

export default favoriteController;