import { auth } from "/js/core/auth.js";

export function initHeaderAuth() {

    const loginBtn = document.querySelector(".login-btn");
    const welcomeText = document.querySelector(".welcome-text");

    if (!loginBtn) return;

    function updateHeader() {
        const user = auth.getUser();

        if (user) {
        loginBtn.textContent = "Déconnexion";
        welcomeText.textContent = `Bienvenue ${user.name}`;
        } else {
        loginBtn.textContent = "Connexion";
        welcomeText.textContent = "";
        }
    }

    loginBtn.addEventListener("click", () => {
        const user = auth.getUser();

        if (user) {
        auth.logout();
        updateHeader();
        window.location.href = "/index.html";
        } else {
        document.dispatchEvent(new Event("openLogin"));
        }
    });

    updateHeader();
}
