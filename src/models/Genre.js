/* ==== IMPORT ==== */

import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";


/* ==== GENRE MODEL ==== */

const Genre = sequelize.define(
    "Genre",
    {
        id_genre: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },

        slug: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },

        banner: {
            type: DataTypes.STRING(255),
            allowNull: true,
        }
    },
    {
        tableName: "Genre",
        freezeTableName: true,
        timestamps: false,
    }
);

export default Genre;