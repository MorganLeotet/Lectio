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
/* INDEX */
/* ============================== */

router.get("/", (req, res) => {
    res.render("pages/index", {
        layout: false,
        title: "Accueil"
    });
});

/* ============================== */
/* HOME */
/* ============================== */

router.get(["/home"], async (req, res) => {

    try {

        /* ================= GOOGLE BOOKS ================= */

    // on récupère les livres depuis le cache (éviter trop d'appel api)
        let booksData = getCached("home_books");
    // si pas de données en cache, on appel l'api
        if (!booksData) {
            const booksRes = await fetch(
                "https://www.googleapis.com/books/v1/volumes?q=subject:fiction&maxResults=40"
            );

            booksData = await booksRes.json();
        // on stocke les données dans le cache pour la prochaine fois
            setCache("home_books", booksData);
        }
    // liste des livres récupérés
        const books = booksData.items || [];

        /* ================= RANDOM BOOKS ================= */

        const randomBooks = [...books]
            .sort(() => Math.random() - 0.5)
            .slice(0, 20);

        /* ================= AUTHORS ================= */

        const authors = [...new Set(
            randomBooks.flatMap(book => book.volumeInfo?.authors || [])
        )]
        .slice(0, 10);

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
    // si l'utilisateur est connecté
        if (req.session.libraryId) {
        // on récupère ses favoris en base
            const favBooks = await LibraryBook.findAll({
                where: {
                    id_library: req.session.libraryId,
                    favorite: true
                }
            });
        // on récupère les infos via google books
            favorites = await Promise.all(

                favBooks.map(async (book) => {

                    const response = await fetch(
                        `https://www.googleapis.com/books/v1/volumes/${book.google_book_id}`
                    );

                    return await response.json();

                })

        );

        /* ===== ORDRE DES FAVORIS ===== */
    // on affiche les plus récents en premier
        favorites.reverse();

}

        /* ================= RENDER ================= */

        res.render("pages/home", {
            title: "Home",
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

    // on récupère la bibliothèque de l'utilisateur connecté

        const library = await Library.findOne({
            where: { id_user: req.session.user.id }
        });
    // si pas encore de bibliothèque, on affiche la page vide

        if (!library) {
            return res.render("pages/library", {
                title: "Ma bibliothèque",
                booksToRead: [],
                booksReading: [],
                booksFinished: []
            });
        }
    // on récupère tous les livres associés à la bibliothèque en base

        const libraryBooks = await LibraryBook.findAll({
            where: {
                id_library: library.id_library
            }
        });
    
    // pour chaque livre, on récupère ses infos via google books

        const books = await Promise.all(

            libraryBooks.map(async (libBook) => {
            
            // on appel google books avec l'id du livre
                const response = await fetch(
                    `https://www.googleapis.com/books/v1/volumes/${libBook.google_book_id}`
                );

                const data = await response.json();
            
            // si aucune info, on ignore le livre
                if (!data.volumeInfo) return null;
            
            // on fusionne les données google books avec nos statuts et nos favoris en local
                return {
                    ...data,
                    reading_status: libBook.reading_status,
                    favorite: libBook.favorite
                };

            })

        );

    
        const validBooks = books.filter(book => book !== null);
    
    // on trie les livres selon le statut de lecture
        const booksToRead = validBooks.filter(
            b => b.reading_status === "to_read"
        );

        const booksReading = validBooks.filter(
            b => b.reading_status === "reading"
        );

        const booksFinished = validBooks.filter(
            b => b.reading_status === "read"
        );

    // on envoie la page "library" avec les données
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

    // on vérifie si y'a bien l'id du livre
        if (!google_book_id) {
            return res.status(400).send("Livre manquant");
        }
    // vérifie si l'utilisateur a bien une bilbiothèque
        if (!req.session.libraryId) {
            return res.status(400).send("Bibliothèque introuvable");
        }
    // vérifie si le livre est déjà dans la bibliothèque
        const existing = await LibraryBook.findOne({
            where: {
                id_library: req.session.libraryId,
                google_book_id
            }
        });
    // si existe pas , on l'ajoute
        if (!existing) {

            await LibraryBook.create({
                id_library: req.session.libraryId,
                google_book_id,
                reading_status: "to_read",
                favorite: false
            });

        }
    // redirection vars page d'avant ou page bibliothèque
        res.redirect(req.get("referer") || "/library");

    } catch (error) {

        console.error("Erreur ajout livre:", error);

        res.status(500).send("Erreur serveur");

    }

});

router.post("/library/remove", requireAuth, async (req, res) => {

    try {
    
    // récupère l'id du livre à supprimer depuis le formulaire
        const { google_book_id } = req.body;
    // véridie que l'id est donné
        if (!google_book_id) {
            return res.status(400).send("Livre manquant");
        }
    // supprime le livre de la biblothèque de l'utilisateur
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
    
    // recherche le livre dans la bibliothèque de l'utilisateur
        const libraryBook = await LibraryBook.findOne({
            where: {
                id_library: req.session.libraryId,
                google_book_id
            }
        });
    
    // si livre existe pas
        if (!libraryBook) {
            return res.status(404).json({
                error: "Livre introuvable"
            });
        }
    // inverser l'état du favori (true <-> false)
        libraryBook.favorite = !libraryBook.favorite;
    // sauvegarde en base
        await libraryBook.save();
    // retourne un json avec le nouvel état
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

        /* ===== LIVRE ===== */
        if (!data.volumeInfo) return null;

        const info = data.volumeInfo;
        
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