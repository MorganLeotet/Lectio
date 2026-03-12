import fetch from "node-fetch";

const bookController = {

    async getGoogleBook(req, res) {

        try {

            const googleId = req.params.googleId;

            const response = await fetch(
                `https://www.googleapis.com/books/v1/volumes/${googleId}`
            );

            const data = await response.json();

            if (!data.volumeInfo) {

                return res.status(404).render("pages/404", {
                    title: "Livre introuvable"
                });

            }

            const info = data.volumeInfo;

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