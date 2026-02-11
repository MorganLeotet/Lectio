const openLoginBtn = document.getElementById('openLogin');
const loginPanel = document.getElementById('loginPanel');
const overlay = document.getElementById('loginOverlay');

const stepEmail = document.getElementById('stepEmail');
const stepPassword = document.getElementById('stepPassword');
const stepRegister = document.getElementById('loginRegister');

const toPassword = document.getElementById('toPassword');
const loginSubmit = document.getElementById('loginSubmit');
const changeUser = document.getElementById('changeUser');

// OUVRIR
openLoginBtn.addEventListener('click', () => {
    overlay.classList.add('active');
    loginPanel.classList.add('active');
});

// PASSER À MOT DE PASSE
toPassword.addEventListener('click', () => {
    const emailValue = document.querySelector('#stepEmail input').value;

    if (emailValue.includes("new")) {
        stepEmail.classList.remove('active');
        stepRegister.classList.add('active');
    } else {
        stepEmail.classList.remove('active');
        stepPassword.classList.add('active');
    }
});

// SIMULER CONNEXION
loginSubmit.addEventListener('click', () => {
    window.location.href = "library.html";
});

// CHANGER UTILISATEUR
changeUser.addEventListener('click', () => {
    stepRegister.classList.remove('active');
    stepEmail.classList.add('active');
});

// FERMER SI CLIC FOND
overlay.addEventListener('click', () => {
    overlay.classList.remove('active');
    loginPanel.classList.remove('active');

    stepPassword.classList.remove('active');
    stepRegister.classList.remove('active');
    stepEmail.classList.add('active');
});

// EMPÊCHER FERMETURE SI CLIC DANS PANEL
loginPanel.addEventListener('click', (e) => {
    e.stopPropagation();
});
