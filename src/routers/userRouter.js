/* ==== IMPORT ==== */

import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import userController from "../controllers/userController.js";

/* ==== ROUTER INITIALIZATION ==== */

const router = Router();

/* ============================= */
/* USER ROUTES                   */
/* ============================= */

/* Récupérer le profil du user connecté */
router.get("/me",authMiddleware,userController.getProfile);

/* Modifier le profil du user connecté */
router.patch("/me",authMiddleware,userController.updateProfile);

/* ==== EXPORT ==== */

export default router;