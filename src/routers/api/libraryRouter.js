/* ==== IMPORT ==== */

import { Router } from "express";
import authMiddleware from "../../middlewares/authMiddleware.js";
import libraryController from "../../controllers/libraryController.js";

/* ==== ROUTER INITIALIZATION ==== */

const router = Router();

/* ============================= */
/* LIBRARY ROUTES                */
/* ============================= */

/* Récupérer la bibliothèque du user connecté */
router.get("/",authMiddleware,libraryController.getMyLibrary);

/* Ajouter un livre dans la bibliothèque */
router.post("/books",authMiddleware,libraryController.addBookToLibrary);

/* Mettre à jour le statut de lecture */
router.patch("/books/:bookId",authMiddleware,libraryController.updateReadingStatus);

/* Retirer un livre de la bibliothèque */
router.delete("/books/:bookId",authMiddleware,libraryController.deleteBookFromLibrary);

/* Modifier le nom de la bibliothèque */
router.patch("/name",authMiddleware,libraryController.updateLibraryName);

/* ==== EXPORT ==== */

export default router;