/* ============================== */
/* IMPORTS */
/* ============================== */

import { Router } from "express";
import fetch from "node-fetch";
import { getCached, setCache } from "../services/googleBooksCache.js";

import { Library, LibraryBook } from "../models/index.js";
import { requireAuth } from "../middlewares/requireAuth.js";

const router = Router();


/* ============================== */
/* HOME */
/* ============================== */

router.get(["/", "/home"], async (req, res) => {

    try {

        /* ================= GOOGLE BOOKS ================= */

        let booksData = getCached("home_books");

        if (!booksData) {
            const booksRes = await fetch(
                "https://www.googleapis.com/books/v1/volumes?q=subject:fiction&maxResults=40"
            );

            booksData = await booksRes.json();
            setCache("home_books", booksData);
        }

        const books = booksData.items || [];

        /* ================= RANDOM BOOKS ================= */

        const randomBooks = [...books]
            .sort(() => Math.random() - 0.5)
            .slice(0, 10);

        /* ================= AUTHORS ================= */

        const authors = [...new Set(
            books.flatMap(book => book.volumeInfo?.authors || [])
        )].slice(0, 10);

        /* ================= GENRES ================= */

        const genresList = [
                { name: "Fantasy", slug: "fantasy", banner: "/assets/banner/fantasy.png" },
                { name: "Policier", slug: "thriller", banner: "/assets/banner/thriller.png" },
                { name: "Jeunesse", slug: "juvenile fiction", banner: "/assets/banner/juvenile fiction.png" },
                { name: "Manga", slug: "manga", banner: "/assets/banner/manga.png" },
                { name: "Voyage", slug: "travel", banner: "/assets/banner/travel.png" },
                { name: "Ados", slug: "young adult fiction", banner: "/assets/banner/young adult fiction.png" },
                { name: "Art", slug: "art", banner: "/assets/banner/art.png" },
                { name: "BD", slug: "graphic novels", banner: "/assets/banner/graphic novels.png" },
                { name: "Comics", slug: "comics & graphic novels", banner: "/assets/banner/comics & graphic novels.png" },
                { name: "Loisirs", slug: "crafts & hobbies", banner: "/assets/banner/crafts & hobbies.png" },
                { name: "Noël", slug: "christmas", banner: "/assets/banner/christmas.png" },
                { name: "Vie Pratique", slug: "cooking", banner: "/assets/banner/cooking.png" },
                { name: "Littérature", slug: "literary collections", banner: "/assets/banner/literary collections.png" },
                { name: "Bien-être", slug: "health & fitness", banner: "/assets/banner/health & fitness.png" },
                { name: "Romance", slug: "romance", banner: "/assets/banner/romance.png" },
                { name: "Science", slug: "science", banner: "/assets/banner/science.png" },
        ]

        const genres = [...genresList]
            .sort(() => Math.random() - 0.5)
            .slice(0, 6);

        /* ================= FAVORITES ================= */

        let favorites = [];

        if (req.session.libraryId) {

            const favBooks = await LibraryBook.findAll({
                where: {
                    id_library: req.session.libraryId,
                    favorite: true
                }
            });

            favorites = await Promise.all(

                favBooks.map(async (book) => {

                    const response = await fetch(
                        `https://www.googleapis.com/books/v1/volumes/${book.google_book_id}`
                    );

                    return await response.json();

                })

        );

        /* ===== ORDRE DES FAVORIS ===== */

        favorites.reverse();

}

        /* ================= RENDER ================= */

        res.render("pages/home", {
            title: "Accueil",
            randomBooks,
            authors,
            genres,
            favorites
        });

    } catch (error) {

        console.error(error);
        res.status(500).send("Erreur serveur");

    }

});


/* ============================== */
/* LIBRARY */
/* ============================== */

router.get("/library", requireAuth, async (req, res) => {

    try {

        const library = await Library.findOne({
            where: { id_user: req.session.user.id }
        });

        if (!library) {
            return res.render("pages/library", {
                title: "Ma bibliothèque",
                booksToRead: [],
                booksReading: [],
                booksFinished: []
            });
        }

        const libraryBooks = await LibraryBook.findAll({
            where: {
                id_library: library.id_library
            }
        });

        const books = await Promise.all(

            libraryBooks.map(async (libBook) => {

                const response = await fetch(
                    `https://www.googleapis.com/books/v1/volumes/${libBook.google_book_id}`
                );

                const data = await response.json();

                if (!data.volumeInfo) return null;

                return {
                    ...data,
                    reading_status: libBook.reading_status,
                    favorite: libBook.favorite
                };

            })

        );

        const validBooks = books.filter(book => book !== null);

        const booksToRead = validBooks.filter(
            b => b.reading_status === "A Lire"
        );

        const booksReading = validBooks.filter(
            b => b.reading_status === "En Cours"
        );

        const booksFinished = validBooks.filter(
            b => b.reading_status === "Lu"
        );

        res.render("pages/library", {
            title: library.name || "Ma bibliothèque",
            library,
            books: validBooks
        });

    } catch (error) {

        console.error(error);
        res.status(500).send("Erreur serveur");

    }

});

router.post("/library/add", requireAuth, async (req, res) => {

    try {

        console.log("SESSION:", req.session);

        const { google_book_id } = req.body;

        if (!google_book_id) {
            return res.status(400).send("Livre manquant");
        }

        if (!req.session.libraryId) {
            return res.status(400).send("Bibliothèque introuvable");
        }

        const existing = await LibraryBook.findOne({
            where: {
                id_library: req.session.libraryId,
                google_book_id
            }
        });

        if (!existing) {

            await LibraryBook.create({
                id_library: req.session.libraryId,
                google_book_id,
                reading_status: "A Lire",
                favorite: false
            });

        }

        res.redirect(req.get("referer") || "/library");

    } catch (error) {

        console.error("Erreur ajout livre:", error);

        res.status(500).send("Erreur serveur");

    }

});

router.post("/library/remove", requireAuth, async (req, res) => {

    try {

        const { google_book_id } = req.body;

        if (!google_book_id) {
            return res.status(400).send("Livre manquant");
        }

        await LibraryBook.destroy({
            where: {
                id_library: req.session.libraryId,
                google_book_id
            }
        });

        res.redirect(req.get("referer") || "/library");

    } catch (error) {

        console.error("Erreur suppression livre:", error);

        res.status(500).send("Erreur serveur");

    }

});

router.post("/library/favorite", requireAuth, async (req, res) => {

    try {

        const { google_book_id } = req.body;

        if (!google_book_id) {
            return res.status(400).json({
                error: "Livre manquant"
            });
        }

        const libraryBook = await LibraryBook.findOne({
            where: {
                id_library: req.session.libraryId,
                google_book_id
            }
        });

        if (!libraryBook) {
            return res.status(404).json({
                error: "Livre introuvable"
            });
        }

        libraryBook.favorite = !libraryBook.favorite;

        await libraryBook.save();

        res.json({
            success: true,
            favorite: libraryBook.favorite
        });

    } catch (error) {

        console.error("Erreur favori :", error);

        res.status(500).json({
            error: "Erreur serveur"
        });

    }

});

/* ============================== */
/* GENRE SELECTED */
/* ============================== */

router.get("/genres/:slug", async (req, res) => {

    try {

        const genreSlug = req.params.slug;   

        const genreName = genreSlug
            .replace("-", " ")
            .replace(/\b\w/g, l => l.toUpperCase());

        const response = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=subject:${genreSlug}&maxResults=20`
        );

        const data = await response.json();

        let books = data.items || [];

        /*books = books.filter(book => 
            book.volumeInfo?.language === "fr"
        );*/

        res.render("pages/genres_selected", {
            title: genreName,
            genreName,
            genreSlug,
            books,
            breadcrumbs: [
                { label: "Genres", url: "/genres" },
                { label: genreName }
            ]
        });

        } catch (error) {

            console.error(error);
            res.status(500).send("Erreur serveur");

        }

});

/* ============================== */
/* GENRES LIST */
/* ============================== */

router.get("/genres", (req, res) => {

    const genres = [
        { name: "Fantasy", slug: "fantasy", banner: "/assets/banner/fantasy.png" },
        { name: "Policier", slug: "thriller", banner: "/assets/banner/thriller.png" },
        { name: "Jeunesse", slug: "juvenile fiction", banner: "/assets/banner/juvenile fiction.png" },
        { name: "Manga", slug: "manga", banner: "/assets/banner/manga.png" },
        { name: "Voyage", slug: "travel", banner: "/assets/banner/travel.png" },
        { name: "Ados", slug: "young adult fiction", banner: "/assets/banner/young adult fiction.png" },
        { name: "Art", slug: "art", banner: "/assets/banner/art.png" },
        { name: "BD", slug: "graphic novels", banner: "/assets/banner/graphic novels.png" },
        { name: "Comics", slug: "comics & graphic novels", banner: "/assets/banner/comics & graphic novels.png" },
        { name: "Loisirs", slug: "crafts & hobbies", banner: "/assets/banner/crafts & hobbies.png" },
        { name: "Noël", slug: "christmas", banner: "/assets/banner/christmas.png" },
        { name: "Vie Pratique", slug: "cooking", banner: "/assets/banner/cooking.png" },
        { name: "Littérature", slug: "literary collections", banner: "/assets/banner/literary collections.png" },
        { name: "Bien-être", slug: "health & fitness", banner: "/assets/banner/health & fitness.png" },
        { name: "Romance", slug: "romance", banner: "/assets/banner/romance.png" },
        { name: "Science", slug: "science", banner: "/assets/banner/science.png" },
    ];

    res.render("pages/genres", {
        title: "Les genres",
        genres,
        breadcrumbs: [
            { label: "Genres" }
        ]
    });

});

/* ============================== */
/* AUTHOR SELECTED */
/* ============================== */

router.get("/authors/:name", async (req, res) => {

    try {

        const author = decodeURIComponent(req.params.name);

        const response = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=inauthor:${author}&maxResults=30`
        );

        const data = await response.json();

        const books = data.items || [];

        res.render("pages/authors_selected", {
            title: author,
            books,
            authorName: author
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

        const bookId = req.params.id;

        const response = await fetch(
            `https://www.googleapis.com/books/v1/volumes/${bookId}`
        );

        const data = await response.json();
        const info = data.volumeInfo;

        /* ===== LIVRE ===== */

        const book = {
            id: data.id,
            title: info.title,
            authors: info.authors || [],
            description: info.description || "",
            cover: info.imageLinks?.thumbnail,
            publisher: info.publisher,
            publishedDate: info.publishedDate,
            pageCount: info.pageCount,
            categories: info.categories || []
        };

        /* ===== LIVRES SIMILAIRES ===== */

        let similarBooks = [];

        if (book.categories.length) {

            const subject = book.categories[0];

            const similarRes = await fetch(
                `https://www.googleapis.com/books/v1/volumes?q=subject:${subject}&maxResults=8`
            );

            const similarData = await similarRes.json();

            similarBooks = (similarData.items || []).filter(b => b.id !== book.id);

        }

        /* ===== VERIFIER SI LIVRE DANS LA BIBLIOTHEQUE ===== */

        let alreadyInLibrary = false;
        let readingStatus = null;

        if (req.session.libraryId) {

            const libraryBook = await LibraryBook.findOne({
                where: {
                    id_library: req.session.libraryId,
                    google_book_id: book.id
                }
            });

            if (libraryBook) {
                alreadyInLibrary = true;
                readingStatus = libraryBook.reading_status;
            }

        }

        /* ===== RENDER ===== */

        res.render("pages/book_detail", {
            title: book.title,
            book,
            similarBooks,
            alreadyInLibrary,
            readingStatus
        });

        } catch (error) {

            console.error(error);
            res.status(500).send("Erreur serveur");

        }

});

/* ============================== */
/* MENTIONS LEGALES */
/* ============================== */

router.get("/mentions-legales", (req, res) => {
    res.render("pages/mentions-legales", {
        title: "Mentions légales"
    });
});

/* ============================== */
/* ACCESSIBILITY */
/* ============================== */

router.get("/accessibilite", (req, res) => {
    res.render("pages/mode-access", {
        title: "Mode accessibilité"
    });
});

/* ============================== */
/* EXPORT */
/* ============================== */

export default router;