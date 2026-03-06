/* ============================== */
/* IMPORTS                        */
/* ============================== */

import { Router } from "express";
import { Book, Author, Genre } from "../models/index.js";

/* ============================== */
/* ROUTER                         */
/* ============================== */

const router = Router();


/* ============================== */
/* INDEX                           */
/* ============================== */

router.get("/", (req, res) => {

    res.render("pages/index", {
        title: "Accueil"
    });

});

/* ============================== */
/* HOME                           */
/* ============================== */

router.get("/home", async (req, res) => {

    try {

        const books = await Book.findAll({
        include: Author
        });

        res.render("pages/home", {
        title: "Accueil",
        books
        });

    } catch (error) {

        console.error(error);
        res.status(500).send("Erreur serveur");

    }

});



/* ============================== */
/* BOOKS CATALOG                  */
/* ============================== */

router.get("/books", async (req, res) => {

    try {

        const books = await Book.findAll({
        include: Author
        });

        res.render("pages/books", {
        title: "Catalogue",
        books
        });

    } catch (error) {

        console.error(error);
        res.status(500).send("Erreur serveur");

    }

});


/* ============================== */
/* BOOK DETAIL                    */
/* ============================== */

router.get("/books/:id", async (req, res) => {

    try {

        const book = await Book.findByPk(req.params.id, {
        include: [Author, Genre]
        });

        if (!book) {
        return res.status(404).render("pages/404",{
        });
        }

        res.render("pages/book_detail", {
        title: book.title,
        book
        });

    } catch (error) {

        console.error(error);
        res.status(500).send("Erreur serveur");

    }

});


/* ============================== */
/* AUTHORS PAGE                   */
/* ============================== */

router.get("/authors", async (req, res) => {

    try {

        const authors = await Author.findAll();

        res.render("pages/authors", {
        title: "Les auteurs",
        authors
        });

    } catch (error) {

        console.error(error);
        res.status(500).send("Erreur serveur");

    }

});

/* ============================== */
/* AUTHORS SELECTED PAGE          */
/* ============================== */

router.get("/authors/:id", async (req, res) => {

    try {

        const author = await Author.findByPk(req.params.id, {
            include: Book
        });

        if (!author) {
            return res.status(404).render("pages/404", {
                title: "Auteur introuvable"
            });
        }

        res.render("pages/authors-selected", {
            title: author.name,
            author,
            books: author.Books
        });

    } catch (error) {

        console.error(error);
        res.status(500).send("Erreur serveur");

    }

});


/* ============================== */
/* LIBRARY PAGE                   */
/* ============================== */

router.get("/library", async (req, res) => {

    try {

        const books = await Book.findAll({
        include: Author
        });

        res.render("pages/library", {
        title: "Ma bibliothèque",
        books
        });

    } catch (error) {

        console.error(error);
        res.status(500).send("Erreur serveur");

    }

});

/* ============================== */
/* GENRE PAGE
/* ============================== */
router.get("/genres", async (req, res) => {

    try {

        const genres = await Genre.findAll();

        res.render("pages/genres", {
        title: "Les genres",
        genres
        });

    } catch (error) {

        console.error(error);
        res.status(500).send("Erreur serveur");

    }

});

/* ============================== */
/* GENRE SELECTED
/* ============================== */
router.get("/genres/:id", async (req, res) => {

    try {

        const genre = await Genre.findByPk(req.params.id, {
        include: {
            model: Book,
            include: Author
        }
        });

        if (!genre) {
        return res.status(404).render("pages/404");
        }

        res.render("pages/genres_selected", {
        title: genre.name,
        genre,
        books: genre.Books
        });

    } catch (error) {

        console.error(error);
        res.status(500).send("Erreur serveur");

    }

});

router.get("/test-genres", async (req, res) => {

    const genres = await Genre.findAll();

    res.json(genres);

});

/* ============================== */
/* EXPORT                         */
/* ============================== */

export default router;