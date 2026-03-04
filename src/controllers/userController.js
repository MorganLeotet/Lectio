import { User } from "../models/index.js";

/* ==== CONTROLLER ==== */

const userController = {

  /* ============================= */
  /* GET USER PROFILE              */
  /* ============================= */

    getProfile: async (req, res) => {

        try {

        const userId = req.userId;

        const user = await User.findByPk(userId, {
            attributes: ["id_user", "mail", "name"]
        });

        if (!user) {
            return res.status(404).json({
            message: "Utilisateur non trouvé"
            });
        }

        return res.json(user);

        } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Erreur serveur"
        });

        }

    },


    /* ============================= */
    /* UPDATE USER PROFILE           */
    /* ============================= */

    updateProfile: async (req, res) => {

        try {

        const userId = req.userId;

        const { name } = req.body;

        if (!name?.trim()) {
            return res.status(400).json({
            message: "Nom invalide"
            });
        }

        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({
            message: "Utilisateur non trouvé"
            });
        }

        user.name = name;

        await user.save();

        return res.json({
            message: "Profil mis à jour",
            user: {
            id_user: user.id_user,
            name: user.name,
            mail: user.mail
            }
        });

        } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Erreur serveur"
        });

        }

    }

};

/* ==== EXPORT ==== */

export default userController;