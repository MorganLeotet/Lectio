/* ==== IMPORT ==== */

import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";


/* ==== BOOK MODEL ==== */

const Book = sequelize.define(
    'Book',
    {
        id_book: {                                              // id unique
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        isbn: {                                                // unique quand y'en a un
            type: DataTypes.STRING(20),
            allowNull: true,
            unique: true,
        },

        title: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },

        summary: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

        publication_date: {
            type: DataTypes.DATE,
            allowNull: true,
        },

        cover: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        
        id_author: {                                                // clé étrangère
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: 'books',
        timestamps: true,
        underscored: true,
    }
);

/* ==== EXPORT ==== */

export default Book;