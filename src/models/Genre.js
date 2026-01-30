/* ==== IMPORT ==== */

import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";


/* ==== GENRE MODEL ==== */

const Genre = sequelize.define(
    'Genre',
    {
        id_genre: {                                              // id unique
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        name: {                                                
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
    },
    {
        tableName: 'Genre',
        timestamps: false,                                      // pas de created_at / updated_at
    }
);

/* ==== EXPORT ==== */

export default Genre;