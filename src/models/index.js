/* ==== IMPORT ==== */

import User from "./User.js";
import Library from "./Library.js";
import Author from "./Author.js";
import Book from "./Book.js";
import LibraryBook from "./LibraryBook.js";
import BookGenre from "./BookGenre.js";
import Genre from "./Genre.js";
import UserFavoriteBook from "./Favorite.js";
import Favorite from "./Favorite.js";


/* ==== RELATIONS ==== */

/* ==== User <-> Library ==== */

User.hasOne(Library, {                              // 1 USER possède 1 LIBRARY

    foreignKey: 'id_user',
});

Library.belongsTo(User, {                           // 1 LIBRARY appartient à 1 USER

    foreignKey: 'id_user',
});

/* ==== Author <-> Book ==== */

Author.hasMany(Book, {                              // 1 Auteur peut écrire plusieurs N Book
    
    foreignKey: 'id_author',

});

Book.belongsTo(Author, {

    foreignKey: 'id_author',
});

/* ==== Library <-> Book (N-N via LibraryBook) ==== */

Library.belongsToMany(Book, {

    through: LibraryBook,
    foreignKey: 'id_library',
});

Book.belongsToMany(Library, {

    through: LibraryBook,
    foreignKey: 'id_book',
});

/* ==== BOOK <-> GENRE ==== */

Book.belongsToMany(Genre, {

    through: BookGenre,
    foreignKey: 'id_genre',
});

Genre.belongsToMany(Book, {

    through: BookGenre,
    foreignKey: 'id_genre',
});

/* ==== FAVORITES RELATION ==== */

User.belongsToMany(Book , {
    through: Favorite,
    foreignKey: 'id_user',
    as: 'favorites',
});

Book.belongsToMany(User, {
    through: Favorite,
    foreignKey:  'id_book',
    as: 'users',
});

/* ==== LIBRARY <-> BOOK ==== */

Library.belongsToMany(Book, {

    through: LibraryBook,
    foreignKey: 'id_library',
    otherKey: 'id_book',
});

Book.belongsToMany(Library, {

    through: LibraryBook,
    foreignKey:'id_book',
    otherKey: 'id_library',
});


/* ==== EXPORT ==== */

export { User, Library, Author, Book, LibraryBook, BookGenre, Genre, UserFavoriteBook };