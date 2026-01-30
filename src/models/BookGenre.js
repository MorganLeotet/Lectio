import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";


/* ==== GENRE MODEL ==== */

const BookGenre = sequelize.define(
    'BookGenre',
    {
        id_book: {                                              // id unique
            type: DataTypes.INTEGER,
            primaryKey: true,
        },

        id_genre: {                                                
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
    },
    {
        tableName: 'book_genre',
        timestamps: false,                                      // pas de created_at / updated_at
    }
);

/* ==== EXPORT ==== */

export default BookGenre;