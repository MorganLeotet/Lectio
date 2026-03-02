/* ============= IMPORT ============= */

import { auth } from "../core/auth.js";


export function initLogin() {

    console.log("init login ok");

    /* ==========================
        SELECTEURS
    ========================== */

    const loginBtn = document.querySelector(".login-btn");
    const mobileUserBtn = document.querySelector(".mobile-user");
    const mobileSearchBtn = document.querySelector(".mobile-search");

    const closeBtn = document.getElementById("closeLogin");
    const overlay = document.getElementById("loginOverlay");
    const panel = document.getElementById("loginSlide");

    const steps = document.querySelectorAll(".step");
    const nextButtons = document.querySelectorAll(".next");
    const backButtons = document.querySelectorAll(".btn-back");

    const forgotBtn = document.getElementById("forgotPasswordBtn");
    const inscriptionBtn = document.getElementById("btnInscription");

    /* ==========================
        SECURITE
    ========================== */

    if (!panel || !overlay || steps.length === 0) return;

    /* ==========================
        ETAT
    ========================== */

    let currentStep = 0;

    /* ==========================
        STEPS
    ========================== */

    function showStep(index) {
        if (!steps[index]) return;

        steps.forEach(step => step.classList.remove("active"));
        steps[index].classList.add("active");

        currentStep = index;
    }

    /* ==========================
        OUVRIR / FERMER
    ========================== */

    function openLogin() {
        overlay.classList.add("active");
        panel.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeLogin() {
        overlay.classList.remove("active");
        panel.classList.remove("active");
        document.body.style.overflow = "";
        showStep(0);
    }

    /* ==========================
        EVENTS OPEN
    ========================== */

    loginBtn?.addEventListener("click", openLogin);
    mobileUserBtn?.addEventListener("click", openLogin);

    closeBtn?.addEventListener("click", closeLogin);
    overlay.addEventListener("click", closeLogin);

    /* ==========================
        RECHERCHE MOBILE
    ========================== */

    mobileSearchBtn?.addEventListener("click", () => {
        openLogin();
        showStep(4);

        setTimeout(() => {
        const input = document.querySelector(".step.active input");
        input?.focus();
        }, 200);
    });

    /* ==========================
        BOUTON CONTINUER
    ========================== */

    nextButtons.forEach(btn => {
        btn.addEventListener("click", e => {
        e.preventDefault();

        switch (currentStep) {

            case 0:
            showStep(1);
            break;

            case 1: // Connexion
                auth.login({
                    name: "Morgan"
                });

                window.location.href = "/pages/library.html";
                break;

            case 2: // Inscription
                auth.login({
                    name: "Morgan"
                });

                window.location.href = "/pages/library.html";
                break;

            case 3:
            showStep(0);
            break;
        }
        });
    });

    /* ==========================
        MOT DE PASSE OUBLIE
    ========================== */

    forgotBtn?.addEventListener("click", () => {
        showStep(3);
    });

    /* ==========================
        INSCRIPTION
    ========================== */

    inscriptionBtn?.addEventListener("click", () => {
        showStep(2);
    });

    /* ==========================
        RETOUR
    ========================== */

    backButtons.forEach(btn => {
        btn.addEventListener("click", () => {
        if (currentStep > 0) {
            showStep(currentStep - 1);
        }
        });
    });

}

