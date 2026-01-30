/* ==== IMPORT ==== */

import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

/* ==== USER MODEL ==== */

const User = sequelize.define(

    'User',
    {
        id_user: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        mail: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },

        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },

        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
    },
    {
        tableName: 'users',         // nom de la table
        timestamps: true,           // createdAt / updatedAt
        underscored: true,          // created_at au lieu de createdAt
    }
);

/* ==== EXPORT ==== */

export default User;