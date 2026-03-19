/* ==== IMPORT ==== */
import argon2 from 'argon2';

import { Library, User } from '../models/index.js';


const authController = {

    register: async (req, res) => {

    const { email, password, name, library } = req.body;

    if (!email || !password) {
        return res.status(400).json({
        message: 'Email et mot de passe obligatoires'
        });
    }

    try {

        const existingUser = await User.findOne({
        where: { mail: email }
        });

        if (existingUser) {
        return res.status(409).json({
            message: 'Utilisateur existe déjà'
        });
        }

        const hashedPassword = await argon2.hash(password);

        const user = await User.create({
        mail: email,
        password: hashedPassword,
        name: name || email
        });

        const newLibrary = await Library.create({
        name: library || 'Ma bibliothèque',
        id_user: user.id_user
        });

        /* 💥 SESSION DIRECT APRÈS REGISTER */

        req.session.user = {
        id: user.id_user,
        email: user.mail,
        name: user.name
        };

        req.session.libraryId = newLibrary.id_library;

        return res.status(201).json({
        message: 'Utilisateur créé',
        user: req.session.user
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
        message: 'Erreur serveur'
        });

    }

    }
}

/* ==== EXPORT ==== */

export default authController;