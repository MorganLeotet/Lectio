const openLoginBtn = document.getElementById("openLogin");
const loginOverlay = document.getElementById("loginOverlay");
const loginPanel = document.getElementById("loginPanel");
const loginSteps = document.getElementById("loginSteps");
const toPassword = document.getElementById("toPassword");

const toPasswordBtn = document.getElementById("toPassword");
const emailInput = document.getElementById("emailInput");
const fakeDatabase = ["test@mail.com", "admin@mail.com"];

const loginBtn = document.querySelector(".step:nth-child(2) .btn-continue");
const passwordInput = document.querySelector('input[type="password"]');

const backToEmail1 = document.getElementById("backToEmail1");
const backToEmail2 = document.getElementById("backToEmail2");

const fakePassword = "1234";
const fakeUsers = [
    "user@mail.com",
    "test@mail.com"
]

loginBtn.addEventListener("click", () => {

    const passwordValue = passwordInput.value.trim();

    if (passwordValue === fakePassword) {
        // Redirection vers bibliothèque
        window.location.href = "library.html";
    } else {
        alert("Mot de passe incorrect");
    }

});

openLoginBtn.addEventListener("click", () => {
    loginOverlay.classList.add("active");
    loginPanel.classList.add("active");
});

loginOverlay.addEventListener("click", () => {
    loginOverlay.classList.remove("active");
    loginPanel.classList.remove("active");
    loginSteps.style.transform = "translateX(0)";
});

toPassword.addEventListener("click", () => {
    const emailValue = emailInput.value.trim();

    if (fakeUsers.includes(emailValue)) {
        // Slide vers PASSWORD
        loginSteps.style.transform = "translateX(-100%)";
    } else {
        // Slide vers INSCRIPTION
        loginSteps.style.transform = "translateX(-200%)";
    }

});

backToEmail1.addEventListener("click", () => {
    loginSteps.style.transform = "translateX(0)";
});

backToEmail2.addEventListener("click", () => {
    loginSteps.style.transform = "translateX(0)";
});
