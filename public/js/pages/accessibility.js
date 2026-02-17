
document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector(".accessibility-toggle");
    const html = document.documentElement;

    if (!button) return;

    button.addEventListener("click", () => {
        html.classList.toggle("accessibility");
    });
});

