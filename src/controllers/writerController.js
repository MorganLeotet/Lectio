/* ==== IMPORT ==== */

import { Author, Book } from "../models/index.js";

/* ==== CONTROLLER ==== */

const writerController = {

  /* ============================= */
  /* API                           */
  /* ============================= */

  /* Récupérer tous les auteurs */
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


    /* Récupérer un auteur avec ses livres */
    getById: async (req, res) => {

        try {

        const authorId = parseInt(req.params.id, 10);

        const author = await Author.findByPk(authorId, {
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

    },


  /* ============================= */
  /* PAGES EJS                     */
  /* ============================= */

  /* Page catalogue des auteurs */
    renderAuthorsPage: async (req, res) => {

        try {

        const authors = await Author.findAll();

        return res.render("pages/authors", {
            title: "Les auteurs",
            authors
        });

        } catch (error) {

        console.error(error);

        return res.status(500).send("Erreur serveur");

        }

    },


    /* Page détail d'un auteur */
    renderAuthorPage: async (req, res) => {

        try {

        const authorId = parseInt(req.params.id, 10);

        const author = await Author.findByPk(authorId, {
            include: [
            {
                model: Book,
                attributes: ["id_book", "title"]
            }
            ]
        });

        if (!author) {
            return res.status(404).send("Auteur introuvable");
        }

        return res.render("pages/author_detail", {
            title: author.name,
            author
        });

        } catch (error) {

        console.error(error);

        return res.status(500).send("Erreur serveur");

        }

    }

};

/* ==== EXPORT ==== */

export default writerController;