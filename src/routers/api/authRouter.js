/* ============================== */
/* IMPORTS */
/* ============================== */

import { Router } from "express";
import authController from "../../controllers/authController";

const router = Router();


/* ============================== */
/* AUTH ROUTES */
/* ============================== */

router.post("/login", authController.login);
router.post("/register", authController.register);
router.get("/logout", authController.logout);
router.get("/me", authController.me);

/* ============================== */
/* EXPORT */
/* ============================== */

export default router;