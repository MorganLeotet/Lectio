/* ==== IMPORT ==== */

import { Router } from "express";
import genreController from "../controllers/genreController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

/* ==== ROUTER INITIALIZATION ==== */

const router = Router();

/* ============================= */
/* GENRE ROUTES                  */
/* ============================= */

/* Voir tous les genres */
router.get("/",authMiddleware,genreController.getAll);

/* Voir un genre */
router.get("/:id",authMiddleware,genreController.getById);

/* ==== EXPORT ==== */

export default router;