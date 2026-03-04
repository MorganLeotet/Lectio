/* ==== IMPORT ==== */

import { Router } from "express";
import writerController from "../controllers/writerController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

/* ==== ROUTER INITIALIZATION ==== */

const router = Router();

/* ============================= */
/* AUTHOR ROUTES                 */
/* ============================= */

/* Voir tous les auteurs */
router.get("/",authMiddleware,writerController.getAll);

/* Voir un auteur */
router.get("/:id",authMiddleware,writerController.getById);

/* ==== EXPORT ==== */

export default router;