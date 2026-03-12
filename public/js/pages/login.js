/* ============= LOGIN MODULE ============= */

export function initLogin() {

    console.log("Login init");

    /* ==========================
        SELECTEURS
    ========================== */

    const loginBtn = document.querySelector(".login-btn");
    const mobileUserBtn = document.querySelector(".mobile-user");

    const overlay = document.getElementById("loginOverlay");
    const panel = document.getElementById("loginSlide");
    const closeBtn = document.getElementById("closeLogin");

    const steps = document.querySelectorAll(".step");
    const nextButtons = document.querySelectorAll(".next");
    const backButtons = document.querySelectorAll(".btn-back");

    const emailInput = document.getElementById("emailInput");

    const loginEmail = document.getElementById("loginEmail");
    const loginPassword = document.getElementById("loginPassword");

    const forgotBtn = document.getElementById("forgotPasswordBtn");
    const inscriptionBtn = document.getElementById("btnInscription");

    if (!panel || !overlay) return;

    /* ==========================
        ETAT
    ========================== */

    let currentStep = 0;

    /* ==========================
        AFFICHER STEP
    ========================== */

    function showStep(index) {

        steps.forEach(step => step.classList.remove("active"));

        if (steps[index]) {
            steps[index].classList.add("active");
            currentStep = index;
        }

    }

    /* ==========================
        OPEN / CLOSE
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
        EVENTS
    ========================== */

    loginBtn?.addEventListener("click", openLogin);
    mobileUserBtn?.addEventListener("click", openLogin);

    closeBtn?.addEventListener("click", closeLogin);
    overlay?.addEventListener("click", closeLogin);

    document.addEventListener("keydown", e => {

        if (e.key === "Escape") closeLogin();

    });

    /* ==========================
        NAVIGATION STEPS
    ========================== */

    nextButtons.forEach(btn => {

        btn.addEventListener("click", async e => {

            e.preventDefault();

            switch (currentStep) {

                /* ===== EMAIL ===== */

                case 0:

                    if (!emailInput?.value.trim()) {

                        emailInput.focus();
                        return;

                    }

                    if (loginEmail) {
                        loginEmail.value = emailInput.value;
                    }

                    showStep(1);

                    break;


                /* ===== LOGIN ===== */

                case 1:

                    const email = loginEmail?.value.trim();
                    const password = loginPassword?.value.trim();

                    if (!email || !password) {

                        alert("Veuillez remplir tous les champs");
                        return;

                    }

                    try {

                        const response = await fetch("/api/auth/login", {

                            method: "POST",

                            headers: {
                                "Content-Type": "application/json"
                            },

                            body: JSON.stringify({
                                email,
                                password
                            })

                        });

                        const data = await response.json();

                        if (!response.ok) {

                            alert(data.error || "Erreur de connexion");
                            return;

                        }

                        window.location.reload();

                    } catch (error) {

                        console.error("Login error:", error);

                    }

                    break;


                /* ===== INSCRIPTION ===== */

                case 2:

                    const firstname = document.getElementById("registerFirstname")?.value.trim();
                    const lastname = document.getElementById("registerLastname")?.value.trim();
                    const registerEmail = document.getElementById("registerEmail")?.value.trim();
                    const registerPassword = document.getElementById("registerPassword")?.value.trim();
                    const libraryName = document.getElementById("registerLibrary")?.value.trim();

                    console.log(firstname, lastname, registerEmail, registerPassword);

                    if (!firstname || !lastname || !registerEmail || !registerPassword) {

                        alert("Veuillez remplir tous les champs");
                        return;

                    }

                    try {

                        const response = await fetch("/api/auth/register", {

                            method: "POST",

                            headers: {
                                "Content-Type": "application/json"
                            },

                            body: JSON.stringify({
                                name: firstname,
                                email: registerEmail,
                                password: registerPassword,
                                library: libraryName
                            })

                        });

                        const data = await response.json();

                        if (!response.ok) {

                            alert(data.error || "Erreur inscription");
                            return;

                        }

                        window.location.reload();

                    } catch (error) {

                        console.error("Register error:", error);

                    }

                    break;


                /* ===== RESET PASSWORD ===== */

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

        const registerEmail = document.getElementById("registerEmail");

        if (registerEmail && emailInput) {

            registerEmail.value = emailInput.value;

        }

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