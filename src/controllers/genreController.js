/* ==== IMPORT ==== */

import { Genre, Book } from "../models/index.js";

/* ==== CONTROLLER ==== */

const genreController = {

  /* ============================= */
  /* GET ALL GENRES                */
  /* ============================= */

    getAll: async (req, res) => {

        try {

        const genres = await Genre.findAll({
            attributes: ["id_genre", "name"]
        });

        return res.json(genres);

        } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Erreur serveur"
        });

        }

    },


    /* ============================= */
    /* GET GENRE BY ID               */
    /* ============================= */

    getById: async (req, res) => {

        try {

        const genreId = parseInt(req.params.id, 10);

        if (isNaN(genreId)) {
            return res.status(400).json({
            message: "ID invalide"
            });
        }

        const genre = await Genre.findByPk(genreId, {

            attributes: ["id_genre", "name"],

            include: [
            {
                model: Book,
                attributes: ["id_book", "title"],
                through: { attributes: [] }
            }
            ]

        });

        if (!genre) {
            return res.status(404).json({
            message: "Genre non trouvé"
            });
        }

        return res.json(genre);

        } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Erreur serveur"
        });

        }

    }

};

/* ==== EXPORT ==== */

export default genreController;
