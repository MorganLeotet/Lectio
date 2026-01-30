/* ==== IMPORT ==== */

import { User } from '../models/index.js';


const userController = {


    getProfile: async (req, res) => {               // récup du profil du user connecté

        try {
            const userId = req.user.userId;             // récup l'id du user

            const user = await User.findOne({
                where: { id_user: userId },
                attributes: ['id_user', 'mail', 'name']
            });
            

            if (!user) {
                return res.status(404).json({
                    message: 'Utilisateur non trouvé'
                });
            }
            return res.json(user);          // on renvoie les infos du profil
        } catch (error) {
            return res.status(500).json({
                message: 'Erreur Serveur'
            });
        }
    },

    updateProfile: async (req, res) => {            // modif du profil du user connecté

        try {
            const userId = req.user.userId;

            const { name } = req.body;       // infos qu'on peut modifier

            await User.update(
                { name },
                { where: { id_user: userId } }
            );
            return res.json({
                message: 'Profil mis à jour'
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: 'Erreur Serveur'
            });
        }
    }
};

/* ==== EXPORT ==== */

export default userController;