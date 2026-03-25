import { initLogin } from "./login.js";

export function loadLogin() {

    const container = document.getElementById("loginContainer");
    if (!container) return;

    fetch("/components/login.html") 
        .then(response => {
        if (!response.ok) {
            throw new Error("Erreur chargement login.html");
        }
        return response.text();
        })
        .then(html => {
        container.innerHTML = html;
        initLogin(); 
        })
        .catch(error => {
        console.error("Login load error :", error);
        });
}