/* ==== IMPORT ==== */

import { Router } from "express";
import bookController from "../../controllers/bookController.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

/* ==== ROUTER INITIALIZATION ==== */

const router = Router();

/* ============================= */
/* GOOGLE BOOK                   */
/* ============================= */

router.get("/google/:googleId", bookController.getGoogleBook);

/* ============================= */
/* BOOK API                      */
/* ============================= */

/* Voir tous les livres */
router.get("/", authMiddleware, bookController.getAllBooks);

/* Voir un livre */
router.get("/:id", bookController.getBookDetail);

/* Créer un livre */
router.post("/", authMiddleware, bookController.createBook);

/* Mettre à jour un livre */
router.patch("/:id", authMiddleware, bookController.updateBook);

/* Supprimer un livre */
router.delete("/:id", authMiddleware, bookController.deleteBook);

/* ==== EXPORT ==== */

export default router;