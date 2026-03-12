import fetch from "node-fetch";

const homeController = {

    async home(req, res) {

    try {

        const fantasyRes = await fetch(
            "https://www.googleapis.com/books/v1/volumes?q=subject:fantasy&maxResults=10"
        );

        const romanceRes = await fetch(
            "https://www.googleapis.com/books/v1/volumes?q=subject:romance&maxResults=10"
        );

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