import { initLogin } from "./login.js";

fetch("../components/login.html")
    .then(res => res.text())
    .then(data => {
        document.getElementById("loginContainer").innerHTML = data;

        // Initialisation du login
    initLogin();
});