/* ============== IMPORT ================ */

import { store } from "../core/store.js";


export function initLibrary() {

    const libraryGrid = document.getElementById("libraryGrid");
    if (!libraryGrid) return;

    let myLibrary = store.library.get();

    /* ==========================
        STORAGE
    ========================== */

    function saveLibrary() {
        store.library.set(myLibrary);
    }

    /* ==========================
        CREATE BOOK
    ========================== */

    function createBook(title, author, cover) {
        return {
        id: Date.now(),
        title,
        author,
        cover,
        status: "a_lire",
        favorite: false
        };
    }

    /* ==========================
        RENDER
    ========================== */

    function getStatusLabel(status) {
        if (status === "a_lire") return "À lire";
        if (status === "en_cours") return "En cours";
        return "Lu";
    }

    function renderLibrary(filter = "all") {

        let books = myLibrary;

        if (filter === "favorites") {
        books = myLibrary.filter(b => b.favorite);
        } else if (filter !== "all") {
        books = myLibrary.filter(b => b.status === filter);
        }

        if (books.length === 0) {
        libraryGrid.innerHTML = "<p>Aucun livre ici.</p>";
        return;
        }

        const html = books.map(book => `
        <div class="book-card" data-id="${book.id}">

            <div class="cover-wrapper">
            <img src="${book.cover}" alt="${book.title}" class="book-cover">

            <span class="status-badge ${book.status}">
                ${getStatusLabel(book.status)}
            </span>

            <button class="favorite-book ${book.favorite ? "active" : ""}" data-id="${book.id}">
                ❤️
            </button>
            </div>

            <div class="book-info">
            <h3>${book.title}</h3>
            <p>${book.author}</p>

            <select class="change-status" data-id="${book.id}">
                <option value="a_lire" ${book.status==="a_lire"?"selected":""}>À lire</option>
                <option value="en_cours" ${book.status==="en_cours"?"selected":""}>En cours</option>
                <option value="lu" ${book.status==="lu"?"selected":""}>Lu</option>
            </select>

            <button class="remove-book" data-id="${book.id}">
                Retirer
            </button>
            </div>

        </div>
        `).join("");

        libraryGrid.innerHTML = html;
    }

    /* ==========================
        EVENTS CLICK
    ========================== */

    libraryGrid.addEventListener("click", e => {

        const id = Number(e.target.dataset.id);

        if (e.target.classList.contains("remove-book")) {
        myLibrary = myLibrary.filter(b => b.id !== id);
        saveLibrary();
        renderLibrary();
        }

        if (e.target.classList.contains("favorite-book")) {
        myLibrary = myLibrary.map(b => {
            if (b.id === id) b.favorite = !b.favorite;
            return b;
        });
        saveLibrary();
        renderLibrary();
        }

        const card = e.target.closest(".book-card");
        if (
        card &&
        !e.target.classList.contains("remove-book") &&
        !e.target.classList.contains("favorite-book") &&
        !e.target.classList.contains("change-status")
        ) {
        localStorage.setItem("selectedBookId", card.dataset.id);
        window.location.href = "book_connected.html";
        }
    });

    /* ==========================
        STATUS CHANGE
    ========================== */

    libraryGrid.addEventListener("change", e => {

        if (!e.target.classList.contains("change-status")) return;

        const id = Number(e.target.dataset.id);
        const status = e.target.value;

        myLibrary = myLibrary.map(b => {
        if (b.id === id) b.status = status;
        return b;
        });

        saveLibrary();
        renderLibrary();
    });

    /* ==========================
        FILTERS
    ========================== */

    document.querySelectorAll(".library_menu button")
        .forEach(btn => {
        btn.addEventListener("click", () => {

            document
            .querySelectorAll(".library_menu button")
            .forEach(b => b.classList.remove("active"));

            btn.classList.add("active");

            renderLibrary(btn.dataset.filter);
        });
        });

    /* ==========================
        INIT DATA
    ========================== */

    if (myLibrary.length === 0) {
        myLibrary = [
        createBook("Le Seigneur des Anneaux","J.R.R. Tolkien","#"),
        createBook("Le Crime de l'Orient-Express","Agatha Christie","#")
        ];
        saveLibrary();
    }

    renderLibrary();
}