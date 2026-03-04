/* ==== IMPORT ==== */

import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import favoriteController from "../controllers/favoriteController.js";

/* ==== ROUTER INITIALIZATION ==== */

const router = Router();

/* ============================= */
/* FAVORITES ROUTES              */
/* ============================= */

/* Ajouter un livre aux favoris */
router.post("/",authMiddleware,favoriteController.addFavorite);

/* Récupérer les favoris du user connecté */
router.get("/",authMiddleware,favoriteController.getFavorites);

/* Supprimer un livre des favoris */
router.delete("/:id_book",authMiddleware,favoriteController.deleteFavorite);

/* ==== EXPORT ==== */

export default router;