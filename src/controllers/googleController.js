import fetch from "node-fetch";

const googleBooksController = {

// on cherche un livre via un mot-clé
    async search(req, res) {

    // on récupère la requête de l'utilisateur
        const query = req.query.q;
    // on appel l'api avec l'encodage de la requête
        const response = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=10`
        );

        const data = await response.json();
    // on transforme les résultats pour garde que les infos utiles
        const books = (data.items || []).map(book => {

            const info = book.volumeInfo;

            return {
                google_id: book.id,
                title: info.title,
                authors: info.authors || [],
            // on gère l'imgage, on convertit en hhtps et image par défaut si absente
                thumbnail: info.imageLinks?.thumbnail? info.imageLinks.thumbnail.replace("http://", "https://"): "/assets/default-book.png"
            };

        });

        res.json(books);

    }

};

export default googleBooksController;