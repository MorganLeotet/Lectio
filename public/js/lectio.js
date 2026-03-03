/* =========== IMPORTS ============ */

console.log("Lectio JS chargé");

import { authGuard } from "../js/core/authGuard.js";
import { initAccessibility } from "./pages/accessibility.js";
import { loadLogin } from "./pages/loadLogin.js";
import { initHome } from "./pages/home.js";
import { initLibrary } from "./pages/library.js";
import { initBook } from "./pages/book_connected.js";
import { initHeaderAuth } from "../components/js/headerAuth.js";

/* GUARD */
authGuard();

/* =========== INIT GLOBAL ============ */
initAccessibility();
loadLogin();
initHome();
initLibrary();
initBook();
initHeaderAuth();