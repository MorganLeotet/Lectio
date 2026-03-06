/* ==== IMPORT ==== */

import { Router } from "express";
import authController from "../../controllers/authController.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

/* ==== ROUTER INITIALIZATION ==== */

const router = Router();

/* ============================= */
/* AUTH API                      */
/* ============================= */

/* Inscription */
router.post("/register", authController.register);

/* Connexion */
router.post("/login", authController.login);

/* Profil utilisateur connecté */
router.get("/me", authMiddleware, authController.me);


/* ============================= */
/* AUTH PAGES                    */
/* ============================= */

/* Page login */
router.get("/login/page", (req, res) => {

    res.render("pages/login", {
        title: "Connexion"
    });

});

/* Page register */
router.get("/register/page", (req, res) => {

    res.render("pages/register", {
        title: "Inscription"
    });

});

/* ==== EXPORT ==== */

export default router;