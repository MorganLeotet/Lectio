import { auth } from "../core/auth.js";

export function initHeaderAuth() {

    const loginBtn = document.querySelector(".login-btn");
    const userInfo = document.querySelector(".user-info");
    const welcomeText = document.querySelector(".welcome-text");
    const logoutBtn = document.querySelector(".logout-btn");

    if (!loginBtn || !userInfo) return;

    function updateHeader() {

        const user = auth.getUser();

        if (user) {
        loginBtn.classList.add("hidden");
        userInfo.classList.remove("hidden");

        if (welcomeText) {
            welcomeText.textContent = `Bienvenue, ${user.name}`;
        }
        } else {
        loginBtn.classList.remove("hidden");
        userInfo.classList.add("hidden");
        }
    }

    // première mise à jour
    updateHeader();

    // écoute changement login/logout
    window.addEventListener("authChange", updateHeader);

    // bouton logout
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
        auth.logout();
        });
    }
}