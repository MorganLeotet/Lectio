import { initLogin } from "./login.js";

fetch("../components/login.html")
    .then(res => res.text())
    .then(data => {

    const container =
        document.getElementById("loginContainer");

    if (container) {
        container.innerHTML = data;

      // IMPORTANT : init APRES injection
        initLogin();
    }

    });