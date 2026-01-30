/* ==== IMPORT ==== */

import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";


/* ==== FAVORITE MODEL ==== */

const Favorite = sequelize.define(
    'Favorite',
    {
        id_user: {                                              // id unique
            type: DataTypes.INTEGER,
            primaryKey: true,
        },

        id_book: {                                                
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
    },
    {
        tableName: 'user_favorite_book',
        timestamps: false,
        underscored: true,                                     // pas de created_at / updated_at
    }
);

/* ==== EXPORT ==== */

export default Favorite;