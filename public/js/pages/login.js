export function initLogin() {

    console.log("init login ok");


    // ON DECLARE TOUT D’ABORD
    const loginBtn = document.querySelector(".login-btn");
    const mobileUserBtn = document.querySelector(".mobile-user");
    const mobileSearchBtn = document.querySelector(".mobile-search");
    const closeBtn = document.getElementById("closeLogin");
    const overlay = document.getElementById("loginOverlay");
    const panel = document.getElementById("loginPanel");

    const steps = document.querySelectorAll(".step");
    const nextButtons = document.querySelectorAll(".next");
    const backButtons = document.querySelectorAll(".btn-back");
    const forgotBtn = document.getElementById("forgotPasswordBtn");
    const inscriptionBtn = document.getElementById("btnInscription");

    // ENSUITE on vérifie
    if (!loginBtn || !panel || !overlay) return;

    // OUVRIR / FERMER LE PANEL
    function openLogin() {
        overlay.classList.add("active");
        panel.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeLogin() {
        overlay.classList.remove("active");
        panel.classList.remove("active");
        document.body.style.overflow = "";
        showStep(0); // reset à la première étape
    }

    // Desktop
    if (loginBtn) {
    loginBtn.addEventListener("click", openLogin);
    }

    // Mobile
    if (mobileUserBtn) {
    mobileUserBtn.addEventListener("click", openLogin);
    }

    loginBtn.addEventListener("click", openLogin);

    if (closeBtn) closeBtn.addEventListener("click", closeLogin);
    overlay.addEventListener("click", closeLogin);

    if (mobileSearchBtn) {
        mobileSearchBtn.addEventListener("click", () => {
            openLogin();      // ouvre le panel
            showStep(4);      // index du step Recherche

            setTimeout(() => {
                const searchInput = document.querySelector(".step.active input");
                if (searchInput) searchInput.focus();
                }, 200);
        });
    }
    
    // GESTION DES STEPS
    let currentStep = 0;

    function showStep(index) {
        steps.forEach(step => step.classList.remove("active"));
        steps[index].classList.add("active");
        currentStep = index;
    }

    // BOUTON CONTINUER
    nextButtons.forEach(button => {
        button.addEventListener("click", (e) => {
        e.preventDefault();

    // Étape 1 → va à password
    if (currentStep === 0) {
        showStep(1);
        return;
    }

    // Étape 2 → connexion (redirige)
    if (currentStep === 1) {
        window.location.href = "/pages/library.html";
        return;
    }

    // Étape 3 → inscription terminée
    if (currentStep === 2) {
        window.location.href = "/pages/library.html";
        return;
    }

    // Étape 4 → après forgot
    if (currentStep === 3) {
      showStep(0); // retour au début
        }
    });
});

    // MOT DE PASSE OUBLIE
    if (forgotBtn) {
        forgotBtn.addEventListener("click", () => {
            console.log("forgot clicked");
        showStep(3); // index 3 = forgot password
        });
    }

    // INSCRIPTION
    if (inscriptionBtn) {
        inscriptionBtn.addEventListener("click", () => {
            showStep(2); // index 2 = inscription
        });
    }

    // BOUTON RETOUR
    backButtons.forEach(button => {
        button.addEventListener("click", () => {
    if (currentStep > 0) {
        showStep(currentStep - 1);
        }   
        });
    });

}

