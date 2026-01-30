/* ==== IMPORT ==== */
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

import { Library, User } from '../models/index.js';


const authController = {

    register: async (req, res) => {                            // INSCRIPTION
        const { email, password } = req.body;

        if (!email || !password) {                         // Verifier si les champs sont ok
            return res.status(400).json({
                message: 'Email et mot de passe obligatoires'
            });
        }

    try {

        const existingUser = await User.findOne({               // Vérif si le user existe déjà dans la BDD
            where: { mail: email }
        });

        if (existingUser) {
            return res.status(409).json({
                message: 'Utilisateur existe déjà'
            })
        }

        const hashedPassword = await argon2.hash(password);             // mot de passe hasher avec argon2

        const user = await User.create({                                // on crée le user 
            mail: email,
            password: hashedPassword,
            name: email
        });

        await Library.create({                          // on crée une bibliothèque vide pour le user
            name: 'Bibliothèque de ' + email,                                     
            id_user: user.id_user
        });

        return  res.status(201).json({
            message: 'Utilisateur crée',
            user: {
                id: user.id_user,
                email: user.mail
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Erreur Serveur'
        });
    }
    },

        login: async (req, res) => {   

            const { email, password } = req.body;

            if (!email || !password) {              // Verifie si les champs sont ok
                return res.status(400).json({
                    message: 'Email et mot de passe obligatoires'
                });
            }

        try {

            const user = await User.findOne({
                where: { mail: email },
            });

            if (!user) {
                return res.status(401).json({
                    message: 'Email ou mot de passe incorrect'
                });
            }

            const isPasswordValid = await argon2.verify(            // verif mot de passe avec Argon2
                user.password, 
                password,
            );       

            if (!isPasswordValid) {
                return res.status(401).json({
                    message: 'Email ou mot de passe incorrect'
                });
            }

            const token = jwt.sign({                        // on gère le token 

                userId: user.id_user,
                email: user.email
            },

            process.env.JWT_SECRET,

            {
                expiresIn: '1h'
            }
        );

            res.json({                              // Connexion réussie
                message: 'Connexion réussie',
                token
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: 'Erreur Serveur'
            });
        }
        }


}

/* ==== EXPORT ==== */

export { authController };