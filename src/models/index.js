/* ==== IMPORT ==== */

import User from "./User.js";
import Library from "./Library.js";
import Author from "./Author.js";
import Book from "./Book.js";
import LibraryBook from "./LibraryBook.js";
import BookGenre from "./BookGenre.js";
import Genre from "./Genre.js";
import Favorite from "./Favorite.js";

/* ==== RELATIONS ==== */

/* USER -> LIBRARY */

User.hasOne(Library, { foreignKey: "id_user" });

Library.belongsTo(User, { foreignKey: "id_user" });

/* AUTHOR -> BOOK */

Author.hasMany(Book, { foreignKey: "id_author" });

Book.belongsTo(Author, { foreignKey: "id_author" });

/* LIBRARY <-> BOOK */

Library.belongsToMany(Book, {
    through: LibraryBook,
    foreignKey: "id_library",
    otherKey: "id_book"
});

Book.belongsToMany(Library, {
    through: LibraryBook,
    foreignKey: "id_book",
    otherKey: "id_library"
});

/* BOOK <-> GENRE */

Book.belongsToMany(Genre, {
    through: BookGenre,
    foreignKey: "id_book"
});

Genre.belongsToMany(Book, {
    through: BookGenre,
    foreignKey: "id_genre"
});

/* USER <-> FAVORITE BOOK */

User.belongsToMany(Book , {
    through: Favorite,
    foreignKey: "id_user",
    as: "favorites"
});

Book.belongsToMany(User, {
    through: Favorite,
    foreignKey: "id_book",
    as: "users"
});

/* ==== EXPORT ==== */

export { User, Library, Author, Book, LibraryBook, BookGenre, Genre, Favorite };