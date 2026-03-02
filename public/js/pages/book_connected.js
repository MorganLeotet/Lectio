/* ================= IMPORT ============= */

import { store } from "../core/store.js";

export function initBook() {

    const titleEl = document.getElementById("detailTitle");
    const authorEl = document.getElementById("detailAuthor");
    const coverEl = document.getElementById("detailCover");

    // Stop si pas sur la bonne page
    if (!titleEl || !authorEl || !coverEl) return;

    const selectedId = store.book.getSelected();
    const myLibrary = store.library.get();

    const book = myLibrary.find(
        b => b.id === selectedId
    );

    // Si aucun livre trouvé
    if (!book) {
        titleEl.textContent = "Livre introuvable";
        authorEl.textContent = "";
        coverEl.style.display = "none";
        return;
    }

    // Injection données
    titleEl.textContent = book.title;
    authorEl.textContent = book.author;
    coverEl.src = book.cover;
    coverEl.alt = book.title;
}