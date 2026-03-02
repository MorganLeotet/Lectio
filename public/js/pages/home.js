export function initHome() {

    const glassIcon = document.querySelector(".glass-icon");
    const mobileSearch = document.getElementById("mobile-search");

    if (!glassIcon || !mobileSearch) return;

    function toggleSearch() {
        mobileSearch.classList.toggle("active");
    }

    function closeSearchIfOverlay(e) {
        if (e.target === mobileSearch) {
        mobileSearch.classList.remove("active");
        }
    }

    glassIcon.addEventListener("click", toggleSearch);
    mobileSearch.addEventListener("click", closeSearchIfOverlay);

}