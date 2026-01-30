/* ==== IMPORT ==== */

import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";


/* ==== AUTHOR MODEL ==== */

const Author = sequelize.define(

    'Author',
    {
        id_author: {                                        // id unique                            
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        name: {                                             // nom de l'auteur
            type: DataTypes.STRING(150),
            allowNull: false,
        },

        bio: {                                              // biographie rapide de l'auteur                                       
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        tableName: 'authors',
        timestamps: true,               // created_at / updated_at
        underscored: true,
    }
);

/* ==== EXPORT ==== */

export default Author;