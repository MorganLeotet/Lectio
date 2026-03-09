/* ============================== */
/* IMPORTS */
/* ============================== */

import { Router } from "express";
import { User } from "../../models/index.js";
import argon2 from "argon2";

const router = Router();


/* ============================== */
/* LOGIN */
/* ============================== */

router.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                error: "Email et mot de passe requis"
            });
        }

        const user = await User.findOne({
            where: { mail: email }
        });

        if (!user) {
            return res.status(401).json({
                error: "Utilisateur introuvable"
            });
        }

        const validPassword = await argon2.verify(user.password, password);

        if (!validPassword) {
            return res.status(401).json({
                error: "Mot de passe incorrect"
            });
        }

        req.session.user = {
            id: user.id_user,
            name: user.name,
            mail: user.mail
        };

        res.json({
            success: true,
            user: req.session.user
        });

    } catch (error) {

        console.error("Login error:", error);

        res.status(500).json({
            error: "Erreur serveur"
        });

    }

});


/* ============================== */
/* REGISTER */
/* ============================== */

router.post("/register", async (req, res) => {

    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                error: "Tous les champs sont requis"
            });
        }

        const existingUser = await User.findOne({
            where: { mail: email }
        });

        if (existingUser) {
            return res.status(400).json({
                error: "Email déjà utilisé"
            });
        }

        const hashedPassword = await argon2.hash(password);

        const newUser = await User.create({
            name,
            mail: email,
            password: hashedPassword
        });

        req.session.user = {
            id: newUser.id_user,
            name: newUser.name,
            mail: newUser.mail
        };

        res.json({
            success: true,
            user: req.session.user
        });

    } catch (error) {

        console.error("Register error:", error);

        res.status(500).json({
            error: "Erreur serveur"
        });

    }

});


/* ============================== */
/* LOGOUT */
/* ============================== */

router.get("/logout", (req, res) => {

    req.session.destroy(() => {
        res.redirect("/");
    });

});


/* ============================== */
/* CURRENT USER */
/* ============================== */

router.get("/me", (req, res) => {

    res.json({
        user: req.session.user || null
    });

});


/* ============================== */
/* EXPORT */
/* ============================== */

export default router;