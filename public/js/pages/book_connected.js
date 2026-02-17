const selectedId = Number(localStorage.getItem("selectedBookId"));
const myLibrary = JSON.parse(localStorage.getItem("myLibrary")) || [];

const book = myLibrary.find(b => b.id === selectedId);

if (book) {
    document.getElementById("detailTitle").textContent = book.title;
    document.getElementById("detailAuthor").textContent = book.author;
    document.getElementById("detailCover").src = book.cover;
}