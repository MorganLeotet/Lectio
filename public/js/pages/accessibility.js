
export function initAccessibility() {

    const button = document.querySelector(".accessibility-toggle");
    if (!button) return;

    const html = document.documentElement;

    button.addEventListener("click", () => {
        html.classList.toggle("accessibility");
    });

}

