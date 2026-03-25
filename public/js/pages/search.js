export function initSearch(){

    const searchInput = document.getElementById("searchInput");
    const popup = document.getElementById("searchPopup");
    const resultLivres = document.getElementById("resultLivres");
    const resultAuteurs = document.getElementById("resultAuteurs");

    if(!searchInput) return;

    let debounceTimer;

    searchInput.addEventListener("input", function(){

        clearTimeout(debounceTimer);

        const query = searchInput.value.trim();

        if(query.length < 3){
            popup.style.display = "none";
            return;
        }

        debounceTimer = setTimeout(() => {
            rechercherGoogleBooks(query);
        }, 400);

    });

    function rechercherGoogleBooks(query){

        fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=6`)
        .then(res => res.json())
        .then(data => afficherResultats(data.items));

    }

    /* ===== AFFICHAGE RESULTATS ===== */

    function afficherResultats(livres){

        resultLivres.innerHTML = "<h3>Livres</h3>";
        resultAuteurs.innerHTML = "<h3>Auteurs</h3>";

        const auteursSet = new Set();

        livres.slice(0,5).forEach(livre => {

            const titre = livre.volumeInfo.title || "Titre inconnu";
            const id = livre.id;

            const auteur = livre.volumeInfo.authors
                ? livre.volumeInfo.authors[0]
                : null;

            const cover = livre.volumeInfo.imageLinks
                ? livre.volumeInfo.imageLinks.thumbnail
                : "/assets/images/no-cover.png";

            /* ===== LIVRE ===== */

            const livreElement = document.createElement("div");
            livreElement.classList.add("result-item");

            livreElement.innerHTML = `
            <a href="/books/${id}" class="search-result">

                <img src="${cover}" alt="${titre}">

                <div class="result-info">
                    <span class="result-title">${titre}</span>
                    <span class="result-author">${auteur ?? "Auteur inconnu"}</span>
                </div>

            </a>
            `;

            resultLivres.appendChild(livreElement);

            /* ===== AUTEUR ===== */

            if(auteur && !auteursSet.has(auteur)){

                auteursSet.add(auteur);

                const auteurElement = document.createElement("div");
                auteurElement.classList.add("result-item");

                auteurElement.innerHTML = `
                <a href="/authors/${encodeURIComponent(auteur)}">
                    ✍️ ${auteur}
                </a>
                `;

                resultAuteurs.appendChild(auteurElement);

            }

        });

        popup.style.display = "block";

    }

    /* ===== FERMER POPUP SI CLICK AILLEURS ===== */

    document.addEventListener("click", function(e){

        if(!e.target.closest(".search-container")){
            popup.style.display = "none";
        }

    });

    document.addEventListener("keydown", (e) => {

        if(e.key === "Escape"){
            popup.style.display = "none";
        }

    });

    /* ===== EVITER REFRESH FORM ===== */

    const searchForm = document.querySelector(".search-bar");

    if(searchForm){

    searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
    });

    }

    const mobileSearchBtn = document.getElementById("mobileSearchBtn");
    const searchBar = document.querySelector(".search-bar");

    if(mobileSearchBtn && searchBar){

        mobileSearchBtn.addEventListener("click", () => {

        searchBar.classList.toggle("active");
        });

    }

}