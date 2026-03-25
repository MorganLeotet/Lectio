/* ==== IMPORT ==== */

import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

/* ==== LIBRARYBOOK MODEL ==== */

const LibraryBook = sequelize.define(
    "LibraryBook",
    {
        id_library: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        },

        google_book_id: {
        type: DataTypes.STRING(255),
        primaryKey: true,
        },

        reading_status: {
        type: DataTypes.ENUM("to_read", "reading", "read"),
        allowNull: false,
        defaultValue: "to_read",
        },

        favorite:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        }
    },
    {
        tableName: "library_book",
        timestamps: false,
    }
);

/* ==== EXPORT ==== */

export default LibraryBook;