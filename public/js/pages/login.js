export function initLogin() {

const openLoginBtns = document.querySelectorAll(".open-login");
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

const forgotPasswordBtn = document.getElementById("forgotPasswordBtn");
const forgotPanel = document.getElementById("forgotPanel");
const backToPassword = document.getElementById("backToPassword");


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

openLoginBtns.forEach(btn => {
    btn.addEventListener("click", () => {
    loginOverlay.classList.add("active");
    loginPanel.classList.add("active");
    });
});

loginOverlay.addEventListener("click", () => {
    loginOverlay.classList.remove("active");
    loginPanel.classList.remove("active");
    loginSteps.style.transform = "translateX(0)";
    forgotPanel.classList.remove("active");
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

forgotPasswordBtn.addEventListener("click", () => {
    // s'assurer que le panel est ouvert
    loginOverlay.classList.add("active");
    loginPanel.classList.add("active");
    // on cache le slider
    loginSteps.style.transform = "translateX(0)";
    // on affiche le forgot panel
    forgotPanel.classList.add("active");
});

backToPassword.addEventListener("click", () => {
    forgotPanel.classList.remove("active");
    loginPanel.classList.add("active");
});

document.querySelector(".user-icon")
    .addEventListener("click", () => {
    openLoginModal();
});
}

