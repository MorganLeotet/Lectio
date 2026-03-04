/* ==== IMPORT ==== */

import { Router } from "express";
import { authController } from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

/* ==== ROUTER INITIALIZATION ==== */

const router = Router();

/* ============================= */
/* AUTH ROUTES                   */
/* ============================= */

/* Inscription utilisateur */
router.post("/register",authController.register);

/* Connexion utilisateur */
router.post("/login",authController.login);

/* Vérifier l'utilisateur connecté */
router.get("/me",authMiddleware,authController.me);

/* ==== EXPORT ==== */

export default router;