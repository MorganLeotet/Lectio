/* ==== IMPORT ==== */

import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

/* ==== LIBRARY MODEL ==== */

const Library = sequelize.define(

    'Library',
    {
        id_library: {                                       // id unique de la bibliothèque
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            defaultValue: "Ma Bibliothèque"
        },

        id_user: {                                          // clé étrangère vers users.id_user
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,                                   // 1 user = 1 library
        },
    },
    {
        tableName: 'libraries',
        timestamps: true,
        underscored: true,
    }
);

/* ==== EXPORT ==== */

export default Library;