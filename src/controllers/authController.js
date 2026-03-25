/* ==== IMPORT ==== */ 
import argon2 from 'argon2'; 
import { Library, User } from '../models/index.js';

const authController = {


/* ============================== */
/* LOGIN */
/* ============================== */

    login: async (req, res) => {

        try {
        
                let { email, password } = req.body;
                email = email.toLowerCase().trim();
        
                const user = await User.findOne({
                    where: { mail: email }
                });
        
                if (!user) {
                    return res.status(401).json({ error: "Utilisateur introuvable" });
                }
        
                const validPassword = await argon2.verify(user.password, password);
        
                if (!validPassword) {
                    return res.status(401).json({ error: "Mot de passe incorrect" });
                }
        
                // récupérer la bibliothèque
                let library = await Library.findOne({
                    where: { id_user: user.id_user }
                });
        
                if (!library) {
                    library = await Library.create({
                        name: `Bibliothèque de ${user.name}`,
                        id_user: user.id_user
                    });
                }
        
                // session
                req.session.user = {
                    id: user.id_user,
                    name: user.name,
                    email: user.mail
                };
        
                req.session.libraryId = library.id_library;
        
                res.status(201).json({
                    success: true,
                    user: req.session.user
                });
        
            } catch (error) {
        
                console.error(error);
                res.status(500).json({ error: "Erreur serveur" });
        
            }
        
    },
/* ============================== */
/* REGISTER */
/* ============================== */

    register: async (req, res) => {

        try {
        
                let { firstname, lastname, email, password, library } = req.body;
        
                email = email.toLowerCase().trim();
        
                if (!firstname || !lastname || !email || !password) {
                    return res.status(400).json({
                        error: "Tous les champs sont requis"
                    });
                }
        
                const name = `${firstname} ${lastname}`;
        
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
                    firstname,
                    lastname,
                    mail: email,
                    password: hashedPassword
                });
        
                const newLibrary = await Library.create({
                    name: library || `Bibliothèque de ${firstname}`,
                    id_user: newUser.id_user
                });
        
                req.session.user = {
                    id: newUser.id_user,
                    name: newUser.name,
                    firstname: newUser.firstname,
                    mail: newUser.mail
                };
        
                req.session.libraryId = newLibrary.id_library;
        
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
    },

/* ============================== */
/* LOGOUT */
/* ============================== */

    logout : (req, res) => {

    req.session.destroy(() => {
        res.redirect("/");
    });

    },

/* =============================================== */
/*          EVOLUTION FUTURE                      */
/* ============================================= */

/* ============================== */
/* CURRENT USER */
/* ============================== 

    me: (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({
            message: "Non authentifié"
        });
    }

    return res.json({
            user: req.session.user
        });
    }
        */
}

/* ==== EXPORT ==== */ 

export default authController;
