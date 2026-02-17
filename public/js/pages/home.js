const glassIcon = document.querySelector(".glass-icon");
const mobileSearch = document.getElementById("mobile-search");

if (glassIcon) {
    glassIcon.addEventListener("click", () => {
        mobileSearch.classList.toggle("active");
    });
}

mobileSearch.addEventListener("click", (e) => {
    if (e.target === mobileSearch) {
        mobileSearch.classList.remove("active");
    }
});