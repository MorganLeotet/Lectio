/* ==== IMPORT ==== */

import { Router } from "express";
import bookController from "../../controllers/bookController.js";
import authMiddleware from "../../middlewares/authMiddleware.js";
import { Book, Author, Genre } from "../../models/index.js";

/* ==== ROUTER INITIALIZATION ==== */

const router = Router();

/* ============================= */
/* BOOK PAGES                    */
/* ============================= */

/* Page détail d'un livre */
router.get("/:id/page", async (req, res) => {

    try {

        const book = await Book.findByPk(req.params.id, {
        include: [
            { model: Author },
            { model: Genre }
        ]
        });

        if (!book) {
        return res.status(404).send("Livre introuvable");
        }

        res.render("pages/book_detail", {
        title: book.title,
        book
        });

    } catch (error) {

    console.error(error);
    res.status(500).send("Erreur serveur");

    } 

});


/* ============================= */
/* BOOK API                      */
/* ============================= */

/* PAGE CATALOGUE */
router.get("/page", bookController.renderBooksPage);

/* Voir tous les livres */
router.get("/", authMiddleware, bookController.getAllBooks);

/* Voir un livre */
router.get("/:id", authMiddleware, bookController.getBookById);

/* Créer un livre */
router.post("/", authMiddleware, bookController.createBook);

/* Mettre à jour un livre */
router.patch("/:id", authMiddleware, bookController.updateBook);

/* Supprimer un livre */
router.delete("/:id", authMiddleware, bookController.deleteBook);

/* ==== EXPORT ==== */

export default router;