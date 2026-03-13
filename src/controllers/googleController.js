import fetch from "node-fetch";

const googleBooksController = {

    async search(req, res) {

        const query = req.query.q;

        const response = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=10`
        );

        const data = await response.json();

        const books = (data.items || []).map(book => {

            const info = book.volumeInfo;

            return {
                google_id: book.id,
                title: info.title,
                authors: info.authors || [],
                thumbnail: info.imageLinks?.thumbnail?.replace("http://", "https://")
            };

        });

        res.json(books);

    }

};

export default googleBooksController;