/* ==== IMPORT ==== */

import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";


/* ==== LIBRARYBOOK MODEL ==== */

const LibraryBook = sequelize.define(
    'LibraryBook',
    {
        id_library: {                                              // id unique
            type: DataTypes.INTEGER,
            primaryKey: true,
        },

        id_book: {                                                
            type: DataTypes.INTEGER,
            primaryKey: true,
        },

        reading_status: {                                           // statut de lecture propre à la bibliothèque
            type: DataTypes.ENUM('to_read', 'reading', 'read'),
            allowNull: false,
        },
    },
    {
        tableName: 'library_book',
        timestamps: false,                                      // pas de created_at / updated_at
    }
);

/* ==== EXPORT ==== */

export default LibraryBook;