/* ==== IMPORT ==== */

import { Author, Book } from "../models/index.js";

/* ==== CONTROLLER ==== */

const writerController = {

  /* ============================= */
  /* GET ALL AUTHORS               */
  /* ============================= */

    getAll: async (req, res) => {

        try {

        const authors = await Author.findAll({
            attributes: ["id_author", "name"]
        });

        return res.json(authors);

        } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Erreur serveur"
        });

        }

    },


    /* ============================= */
    /* GET AUTHOR BY ID              */
    /* ============================= */

    getById: async (req, res) => {

        try {

        const authorId = parseInt(req.params.id, 10);

        if (isNaN(authorId)) {
            return res.status(400).json({
            message: "ID invalide"
            });
        }

        const author = await Author.findByPk(authorId, {

            attributes: ["id_author", "name"],

            include: [
            {
                model: Book,
                attributes: ["id_book", "title"]
            }
            ]

        });

        if (!author) {
            return res.status(404).json({
            message: "Auteur non trouvé"
            });
        }

        return res.json(author);

        } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Erreur serveur"
        });

        }

    }

};

/* ==== EXPORT ==== */

export default writerController;
