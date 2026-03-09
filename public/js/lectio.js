/* =========== IMPORTS ============ */

console.log("Lectio JS chargé");

import { authGuard } from "./core/authGuard.js";
import { initAccessibility } from "./pages/accessibility.js";
import { initHome } from "./pages/home.js";
import { initLibrary } from "./pages/library.js";
import { initBook } from "./pages/book_connected.js";
import { initLogin } from "./pages/login.js";

/* GUARD */
authGuard();

/* =========== INIT GLOBAL ============ */

initAccessibility();
initLogin();
initHome();
initLibrary();
initBook();