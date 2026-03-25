import fetch from "node-fetch";

const homeController = {

// on affiche la "home" avec des catégories spécifiques
    async home(req, res) {

    try {

    // on appel l'api, pour récupérer les livres de la catégorie "fantasy"
        const fantasyRes = await fetch(
            "https://www.googleapis.com/books/v1/volumes?q=subject:fantasy&maxResults=10"
        );

        const romanceRes = await fetch(
            "https://www.googleapis.com/books/v1/volumes?q=subject:romance&maxResults=10"
        )

    // on convertit les réponses api en json
        const fantasyData = await fantasyRes.json();
        const romanceData = await romanceRes.json();

        res.render("pages/home", {
            fantasy: fantasyData.items || [],
            romance: romanceData.items || []
        });

        } catch (error) {

        console.error(error);
        res.status(500).send("Erreur serveur");

        }

    }

};

export default homeController;