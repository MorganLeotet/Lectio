// ===============================
// 📚 INITIALISATION
// ===============================

let myLibrary = JSON.parse(localStorage.getItem("myLibrary")) || [];
const libraryGrid = document.getElementById("libraryGrid");
if (libraryGrid) {


// ===============================
// 💾 SAUVEGARDE
// ===============================

function saveLibrary() {
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}


// ===============================
// 🏗️ CRÉER UN LIVRE
// ===============================

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


// ===============================
// ➕ AJOUTER UN LIVRE
// ===============================

function addBook(title, author, cover) {
    const newBook = createBook(title, author, cover);
    myLibrary.push(newBook);
    saveLibrary();
    renderLibrary();
}


// ===============================
// 🎨 AFFICHAGE
// ===============================

function renderLibrary(filter = "all") {

    libraryGrid.innerHTML = "";

    let filteredBooks = myLibrary;

    if (filter !== "all") {
        if (filter === "favorites") {
        filteredBooks = myLibrary.filter(book => book.favorite);
        } else {
        filteredBooks = myLibrary.filter(book => book.status === filter);
        }
    }

    if (filteredBooks.length === 0) {
        libraryGrid.innerHTML = "<p>Aucun livre ici.</p>";
        return;
    }

    filteredBooks.forEach(book => {

        
        book.status === "a_lire" ? "À lire" :
        book.status === "en_cours" ? "En cours" :
        "Lu";

        libraryGrid.innerHTML += `
        <div class="book-card" data-id="${book.id}">

            <div class="cover-wrapper">
        <img src="${book.cover}" alt="${book.title}" class="book-cover">

        <span class="status-badge ${book.status}">
        ${
            book.status === "a_lire" ? "À lire" :
            book.status === "en_cours" ? "En cours" :
            "Lu"
        }
        </span>

        <button class="favorite-book ${book.favorite ? "active" : ""}" data-id="${book.id}">
        ❤️
        </button>
    </div>

    <div class="book-info">
        <h3>${book.title}</h3>
        <p>${book.author}</p>

        <select class="change-status" data-id="${book.id}">
        <option value="a_lire" ${book.status === "a_lire" ? "selected" : ""}>À lire</option>
        <option value="en_cours" ${book.status === "en_cours" ? "selected" : ""}>En cours</option>
        <option value="lu" ${book.status === "lu" ? "selected" : ""}>Lu</option>
        </select>

        <button class="remove-book" data-id="${book.id}">
        Retirer
        </button>
    </div>`;
    });
}


// ===============================
// 🎯 GESTION DES ACTIONS (EVENT DELEGATION)
// ===============================

libraryGrid.addEventListener("click", (e) => {

    const id = Number(e.target.dataset.id);

    // 🗑️ Supprimer
    if (e.target.classList.contains("remove-book")) {
        myLibrary = myLibrary.filter(book => book.id !== id);
        saveLibrary();
        renderLibrary();
    }

    // ❤️ Favori
    if (e.target.classList.contains("favorite-book")) {
        myLibrary = myLibrary.map(book => {
        if (book.id === id) {
            book.favorite = !book.favorite;
        }
        return book;
        });
        saveLibrary();
        renderLibrary();
    }
    // 📖 Cliquer sur la carte → page détail
    if (e.target.closest(".book-card") &&
        !e.target.classList.contains("remove-book") &&
        !e.target.classList.contains("favorite-book") &&
        !e.target.classList.contains("change-status")) {

    const card = e.target.closest(".book-card");
    const bookId = Number(card.dataset.id);

    localStorage.setItem("selectedBookId", bookId);

    window.location.href = "book_connected.html"; // adapte le nom si besoin
}
});


// ===============================
// 🔄 CHANGEMENT DE STATUT
// ===============================

libraryGrid.addEventListener("change", (e) => {

    if (e.target.classList.contains("change-status")) {

        const id = Number(e.target.dataset.id);
        const newStatus = e.target.value;

        myLibrary = myLibrary.map(book => {
        if (book.id === id) {
            book.status = newStatus;
        }
        return book;
        });

        saveLibrary();
        renderLibrary();
    }
});


// ===============================
// 🔎 FILTRES MENU
// ===============================

document.querySelectorAll(".library_menu button").forEach(btn => {

    btn.addEventListener("click", () => {

        document
        .querySelectorAll(".library_menu button")
        .forEach(b => b.classList.remove("active"));

        btn.classList.add("active");

        const filter = btn.dataset.filter;
        renderLibrary(filter);
    });

});

// ===============================
// 🧪 LIVRE TEST (si bibliothèque vide)
// ===============================

if (myLibrary.length === 0) {

    const books = [
        {
        id: Date.now(),
        title: "Le Seigneur des Anneaux",
        author: "J.R.R. Tolkien",
        /*cover: "#",*/
        status: "a_lire",
        favorite: false
        },
        {
        id: Date.now() + 1,
        title: "Le Crime de l'Orient-Express",
        author: "Agatha Christie",
        /*cover: "#",*/
        status: "lu",
        favorite: true
        },
        {
        id: Date.now() + 2,
        title: "Des Souris et des Hommes",
        author: "John Steinbeck",
        /*cover: "#",*/
        status: "en_cours",
        favorite: false
        },
        {
        id: Date.now() + 3,
        title: "Sans Atout",
        author: "Boileau-Narcejac",
        /*cover: "#",*/
        status: "a_lire",
        favorite: false
        },
        {
        id: Date.now() + 4,
        title: "Sans Atout",
        author: "Boileau-Narcejac",
        /*cover: "#",*/
        status: "a_lire",
        favorite: false
        },
        {
        id: Date.now() + 5,
        title: "Sans Atout",
        author: "Boileau-Narcejac",
        /*cover: "#",*/
        status: "a_lire",
        favorite: false
        },
        {
        id: Date.now() + 6,
        title: "Sans Atout",
        author: "Boileau-Narcejac",
        /*cover: "#",*/
        status: "a_lire",
        favorite: false
        },
        {
        id: Date.now() + 7,
        title: "Le Seigneur des Anneaux",
        author: "J.R.R. Tolkien",
        /*cover: "#",*/
        status: "a_lire",
        favorite: false
        },
        {
        id: Date.now() + 8,
        title: "Le Seigneur des Anneaux",
        author: "J.R.R. Tolkien",
        /*cover: "#",*/
        status: "a_lire",
        favorite: false
        }
    ];

    myLibrary = books;
    saveLibrary();
}
// ===============================
// 🏁 LANCEMENT INITIAL
// ===============================

renderLibrary();
}