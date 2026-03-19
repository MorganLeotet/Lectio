/* ============== IMPORT ================ */

export function initLibrary() {

        const buttons = document.querySelectorAll(".library_menu button");

        let currentFilter = "all";

        if (!buttons.length) return;

        /* ===== FONCTION FILTRE ===== */

        function applyCurrentFilter() {

            const books = document.querySelectorAll(".book-card");

            books.forEach(book => {

                const status = book.dataset.status;
                const favorite = book.dataset.favorite;

                if (currentFilter === "favorites") {
                    book.style.display = (favorite === "true") ? "block" : "none";
                    return;
                }

                if (currentFilter === "all" || currentFilter === status) {
                    book.style.display = "block";
                } else {
                    book.style.display = "none";
                }

            });

        }

        /* ===== CLICK FILTER ===== */

        buttons.forEach(button => {

            button.addEventListener("click", () => {

                currentFilter = button.dataset.filter;

                applyCurrentFilter();

            });

        });

        /* ===== CHANGE STATUS ===== */

        document.addEventListener("change", async (e) => {

            if (!e.target.classList.contains("change-status")) return;

            const google_book_id = e.target.dataset.id;
            const reading_status = e.target.value;

            try {

                await fetch(`/api/library/books/${google_book_id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        reading_status
                    })
                });

                /* ===== MAJ VISUELLE ===== */

                const card = e.target.closest(".book-card");
                const badge = card.querySelector(".status-badge");

                const labels = {
                    to_read: "À lire",
                    reading: "En cours",
                    read: "Lu"
                };

                if (badge) {
                    badge.textContent = labels[reading_status];
                    badge.className = "status-badge " + reading_status;
                }

                card.dataset.status = reading_status;

                /* 💥 LA MAGIE EST ICI */

                applyCurrentFilter();

            } catch (err) {

                console.error("Erreur mise à jour statut :", err);

            }

        });

    }
        document.addEventListener("click", async (e) => {

            if (!e.target.classList.contains("favorite-book")) return;

            e.preventDefault();
            e.stopPropagation();

            const btn = e.target;
            const google_book_id = btn.dataset.id;

            try {

                const response = await fetch("/library/favorite", {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        google_book_id
                    })

                });

                const data = await response.json();

                if (data.success) {

                    btn.classList.toggle("active", data.favorite);

                }

            } catch (error) {

                console.error("Erreur favori :", error);

            }

        });

