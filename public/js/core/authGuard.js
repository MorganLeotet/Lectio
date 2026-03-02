import { auth } from "./auth.js";

export function authGuard() {

    const protectedPages = [
        "/pages/library.html",
        "/pages/book_connected.html"
    ];

    const currentPath = window.location.pathname;

    // page protégée ?
    if (!protectedPages.includes(currentPath)) return;

    // pas connecté → redirection
    if (!auth.isLogged()) {
        window.location.href = "/index.html";
    }
}