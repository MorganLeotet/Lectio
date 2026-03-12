/* ============== IMPORT ================ */

export function initLibrary() {

    const buttons = document.querySelectorAll(".library_menu button");
    const books = document.querySelectorAll(".book-card");

    if (!buttons.length) return;

    buttons.forEach(button => {

    button.addEventListener("click", () => {

        const filter = button.dataset.filter;

        /* ===== FILTRE COUP DE COEUR ===== */

        if(filter === "favorites"){

            books.forEach(book=>{

                if(book.dataset.favorite === "true"){
                    book.style.display="block";
                }else{
                    book.style.display="none";
                }

            });

            return;
        }

        /* ===== FILTRE STATUT ===== */

        books.forEach(book => {

            const status = book.dataset.status;

            if (filter === "all" || filter === status) {
                book.style.display = "block";
            } else {
                book.style.display = "none";
            }

        });

    });

});

    document.addEventListener("change", async (e) => {

        if(!e.target.classList.contains("change-status")) return;

        const google_book_id = e.target.dataset.id;
        const reading_status = e.target.value;

        try{

            await fetch(`/library/books/${google_book_id}`,{

                method:"PATCH",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify({
                    reading_status
                })

            });

            /* ===== MAJ VISUELLE ===== */

            const card = e.target.closest(".book-card");
            const badge = card.querySelector(".status-badge");

            if(badge){

                badge.textContent = reading_status;

                badge.className =
                "status-badge " +
                reading_status.toLowerCase().replace(" ","_");

            }

            /* mettre à jour le filtre */

            card.dataset.status = reading_status.toLowerCase().replace(" ","_");

        }catch(err){

            console.error("Erreur mise à jour statut :",err);

        }

    });

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

}