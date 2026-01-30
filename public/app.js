const API_URL = 'http://localhost:3000';            // URL de base de l'API 


async function login() {                // on appel cette fonction quand on clique sur Se connecter

    const email = document.getElementById('email').value;           // on récupère l'email saisie dans le champ par le user
    const password = document.getElementById('password').value;     // on récupère le mot de passe saisie dans le champ par le user

    const response = await fetch(`${API_URL}/auth/login`, {         // on envoie une requête à l'API
        method: 'POST',             // on envoie des données
        headers: {
            'Content-Type': 'application/json'      // on envoie du JSON
        },

        body: JSON.stringify({ email, password })           // les données sont envoyé à l'API
    });

    const data = await response.json();         // on transforme la réponse de l'API en objet JS

    if (response.ok) {      // si connexion réussie

        localStorage.setItem('token', data.token);           // on stocke le token JWT dans le navigateur

        window.location.href = '/books.html';               // redirection du user vers la page des livres
    } else {
        document.getElementById('message').innerText = data.message;        // sinon on affiche le message renvoyé par l'API
    };
}

async function loadBooks() {                    // on charge les livres du user connecté

    const token = localStorage.getItem('token');        // on récupère le token stocker dans le navigateur

    if (!token) {
        window.location.href = '/login.html';           // si pas de token , on revient sur la page login
        return;
    }

    const response = await fetch(`${API_URL}/books`, {          // appel l'API GET /books avec le token
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    const books = await response.json();        // on transforme le réponse en objet JS

    const list = document.getElementById('books-list');         // on récupère la list html

    if (!list) return;      // si la page a pas de liste , alors on fait rien

    list.innerHTML = '';    // on vide la liste avant d'afficher

    books.forEach(book => {         // pour chaque livre, on crée un li
        const li = document.createElement('li');
        li.innerHTML = `
            ${book.title} - ${book.author} (${book.status})
            <button onclick="deleteBook(${book.id})">Retirer</button>
            `;

        list.appendChild(li);
    });
    
}

async function addBook() {          // Ajouter un livre

    const token = localStorage.getItem('token');

    const title = document.getElementById('title').value;           // on récupère les valeurs saisies
    const author = document.getElementById('author').value;
    const status = document.getElementById('status').value;

    if (!title || !author) {                    // une vérif simple
        alert('Titre et auteur obligatoires');
        return;
    }

    const response = await fetch(`${API_URL}/books`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },

        body: JSON.stringify({
            title,
            author,
            status
        })
    });

    if (response.ok) {          // si c'est ok

        document.getElementById('title').value = '';        // on vide les champs
        document.getElementById('author').value = '';

    loadBooks();        // on recharge la liste des livres

    } else {
        alert('Erreur lors de l\'ajout du livre');
    }
}

function logout() {         // déconnexion du user

    localStorage.removeItem('token');       // on supprime le token
    window.location.href('/login.html');    // on revient à la page connexion
}

if (window.location.pathname === '/books.html') {       // si on est sur book.html, on charge les livres automatiquement
    loadBooks();
}

async function deleteBook(id) {             // supprimer un livre

    const confirmDelete = confirm('Es-tu sûr de vouloir retirer ce livre ?');       // demande confirmation au user

    if (!confirmDelete) {       // si le user clique sur "Annuler", on stoppe tout
        return;
    }

    const token = localStorage.getItem('token');        // on récupère le token

    await fetch(`${API_URL}/books/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    loadBooks();        // après avoir supprimer, on recharge la liste des livres
}
