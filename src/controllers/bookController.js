import fetch from "node-fetch";

const bookController = {

// on récupère et affiche le détail d'un livre via google books
    async getGoogleBook(req, res) {

        try {
        
        // on récupère l'id google books depuis l'url
            const googleId = req.params.googleId;
        // on appel l'api pour récupérer les infos du livre
            const response = await fetch(
                `https://www.googleapis.com/books/v1/volumes/${googleId}`
            );

            const data = await response.json();
        // si aucune info , page 404
            if (!data.volumeInfo) {

                return res.status(404).render("pages/404", {
                    title: "Livre introuvable"
                });

            }
        // on récupère les infos pricipales d'un livre
            const info = data.volumeInfo;
        // on moddifie les données pour éviter les erreurs côté front
            const book = {
                id: data.id,
                title: info.title || "Titre inconnu",
                authors: info.authors || [],
                description: info.description || "",
                image: info.imageLinks?.thumbnail || null,
                categories: info.categories || [],
                publishedDate: info.publishedDate || null,
                pageCount: info.pageCount || null,
                publisher: info.publisher || null
            };

            res.render("pages/book_detail", {
                title: book.title,
                book
            });

        } catch (error) {

            console.error(error);
            res.status(500).send("Erreur serveur");

        }

    }

};

export default bookController;