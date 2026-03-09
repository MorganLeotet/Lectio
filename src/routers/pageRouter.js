/* ============================== */
/* IMPORTS */
/* ============================== */

import { Router } from "express";
import { Book, Author, Genre } from "../models/index.js";
import { requireAuth } from "../middlewares/requireAuth.js";

const router = Router();


/* ============================== */
/* HOME */
/* ============================== */

router.get(["/", "/home"], async (req, res) => {

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
/* BOOKS CATALOG */
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
/* BOOK DETAIL */
/* ============================== */

router.get("/books/:id", async (req, res) => {

    try {

        const book = await Book.findByPk(req.params.id, {
            include: [
                Author,
                Genre
            ]
        });

        if (!book) {

            return res.status(404).render("pages/404", {
                title: "Livre introuvable"
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
/* AUTHORS */
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
/* AUTHOR DETAIL */
/* ============================== */

router.get("/authors/:id", async (req, res) => {

    try {

        const author = await Author.findByPk(req.params.id, {
            include: {
                model: Book,
                include: Author
            }
        });

        if (!author) {

            return res.status(404).render("pages/404");

        }

        res.render("pages/authors-selected", {
            title: author.firstname + " " + author.lastname,
            author,
            books: author.Books
        });

    } catch (error) {

        console.error(error);
        res.status(500).send("Erreur serveur");

    }

});


/* ============================== */
/* GENRES */
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
/* GENRE DETAIL */
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


/* ============================== */
/* LIBRARY (AUTH REQUIRED) */
/* ============================== */

router.get("/library", requireAuth, async (req, res) => {

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
/* EXPORT */
/* ============================== */

export default router;