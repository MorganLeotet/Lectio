const toggleGenres = document.querySelector(".genres-toggle");
const wrapperGenres = document.querySelector(".genres-wrapper");

toggleGenres.addEventListener("click", () => {
    wrapperGenres.classList.toggle("expanded");
});