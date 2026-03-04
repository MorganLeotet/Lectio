/* ==== IMPORT ==== */

import { User, Book } from "../models/index.js";

/* ==== CONTROLLER ==== */

const favoriteController = {

  /* ============================= */
  /* ADD FAVORITE                  */
  /* ============================= */

    addFavorite: async (req, res) => {

        try {

        const userId = req.userId;
        const { id_book } = req.body;

        const bookId = parseInt(id_book, 10);

        if (isNaN(bookId)) {
            return res.status(400).json({
            message: "ID du livre invalide"
            });
        }

        const user = await User.findByPk(userId);
        const book = await Book.findByPk(bookId);

        if (!user || !book) {
            return res.status(404).json({
            message: "Utilisateur ou livre introuvable"
            });
        }

        const alreadyFavorite = await user.hasFavorite(book);

        if (alreadyFavorite) {
            return res.status(409).json({
            message: "Livre déjà dans les favoris"
            });
        }

        await user.addFavorite(book);

        return res.status(201).json({
            message: "Livre ajouté aux favoris"
        });

        } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Erreur serveur"
        });

        }

    },


    /* ============================= */
    /* REMOVE FAVORITE               */
    /* ============================= */

    deleteFavorite: async (req, res) => {

        try {

        const userId = req.userId;

        const bookId = parseInt(req.params.id_book, 10);

        if (isNaN(bookId)) {
            return res.status(400).json({
            message: "ID du livre invalide"
            });
        }

        const user = await User.findByPk(userId);
        const book = await Book.findByPk(bookId);

        if (!book) {
            return res.status(404).json({
            message: "Livre introuvable"
            });
        }

        await user.removeFavorite(book);

        return res.json({
            message: "Livre retiré des favoris"
        });

        } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Erreur serveur"
        });

        }

    },


    /* ============================= */
    /* GET USER FAVORITES            */
    /* ============================= */

    getFavorites: async (req, res) => {

        try {

        const userId = req.userId;

        const user = await User.findByPk(userId, {

            attributes: [],

            include: [
            {
                model: Book,
                as: "favorites",
                attributes: ["id_book", "title"]
            }
            ]

        });

        if (!user) {
            return res.status(404).json({
            message: "Utilisateur introuvable"
            });
        }

        return res.json(user.favorites);

        } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Erreur serveur"
        });

        }

    }

};

/* ==== EXPORT ==== */

export default favoriteController;