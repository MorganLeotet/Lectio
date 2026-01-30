# Cahier des charges

## 📖 Présentation du projet

Le projet consiste à concevoir et développer une application web de gestion de bibliothèque personnelle.
Cette application permet aux utilisateurs de regrouper leurs livres au même endroit, de suivre l’état de leurs lectures et de découvrir de nouveaux ouvrages à travers un catalogue accessible à tous.

L’application est pensée pour être :
simple d’utilisation,
accessible à tous, y compris aux personnes ayant des besoins spécifiques,
utilisable aussi bien par des visiteurs que par des utilisateurs connectés.
Les visiteurs peuvent découvrir librement le contenu de l’application, tandis que les utilisateurs connectés peuvent gérer leur propre bibliothèque personnelle.
Le projet est développé dans une logique de MVP (Minimum Viable Product), c’est-à-dire une première version fonctionnelle et cohérente, volontairement limitée, afin de poser des bases solides avant d’éventuelles évolutions.

## 🧩 Besoins du projet

Afin de répondre à cette problématique, le projet doit satisfaire les besoins suivants :

### 📚 Besoin de centralisation

Les utilisateurs ont besoin d’un espace unique leur permettant de regrouper l’ensemble de leurs livres afin d’éviter la dispersion des informations et de mieux s’organiser.

### ⏱️ Besoin de suivi des lectures

Les utilisateurs doivent pouvoir suivre l’état de leurs lectures (livre à lire, en cours de lecture ou déjà lu) afin de mieux gérer leur temps de lecture et leur progression.

### 🔍 Besoin de découverte

Les visiteurs et les utilisateurs ont besoin de découvrir de nouveaux livres grâce à :
	. la navigation par genres,
	. la consultation des auteurs,
	. la mise en avant des coups de cœur des lecteurs.

### 🌐 Besoin d’accessibilité

L’application doit être accessible au plus grand nombre, notamment aux personnes rencontrant des difficultés de lecture ou de navigation.Un mode accessibilité est donc nécessaire pour améliorer le confort d’utilisation.

### 🔐 Besoin de différenciation des accès

Il est nécessaire de distinguer :

	 .les visiteurs, qui consultent librement le catalogue,
	. les utilisateurs connectés, qui peuvent gérer leur bibliothèque personnelle.

Cette distinction permet de protéger les données personnelles tout en offrant une découverte libre de l’application.

### ⚙️ Besoin de simplicité technique

L’application doit rester simple à utiliser et à maintenir, avec des fonctionnalités clairement définies et un périmètre maîtrisé, afin de garantir la faisabilité du projet dans le cadre du MVP.

Ces besoins ont permis de définir les objectifs du projet, en cohérence avec les usages attendus par les utilisateurs.

## 🎯 Objectifs du projet

L’objectif du projet est de concevoir une application web simple, accessible et fonctionnelle permettant aux utilisateurs de gérer leur bibliothèque personnelle et de découvrir de nouveaux livres.

À travers ce projet, l’application doit permettre :

### 📚 Gérer une bibliothèque personnelle

Permettre à chaque utilisateur connecté de disposer d’un espace personnel dans lequel il peut ajouter, consulter et organiser ses livres.

### ⏱️ Suivre l’état de lecture des livres

Offrir la possibilité de définir un statut de lecture pour chaque livre (à lire, en cours, lu) afin d’aider les utilisateurs à suivre leur progression.

### 🔍 Faciliter la découverte de nouveaux livres

Proposer un catalogue consultable par tous, avec une navigation par genres et par auteurs, afin de favoriser la découverte de nouveaux ouvrages.

### ❤️ Mettre en avant les coups de cœur des lecteurs

Permettre aux utilisateurs de marquer des livres comme coups de cœur afin de mettre en avant les ouvrages appréciés par la communauté.

### 🌐 Rendre l’application accessible au plus grand nombre

Intégrer un mode accessibilité afin d’améliorer la lisibilité et la navigation pour les personnes ayant des besoins spécifiques.

### 🔐 Proposer une gestion des accès simple et sécurisée

Différencier les fonctionnalités accessibles aux visiteurs et aux utilisateurs connectés, tout en garantissant la sécurité des données personnelles.

### ⚙️ Développer une application cohérente et évolutive

Concevoir une application respectant le périmètre du MVP, avec une architecture claire, afin de faciliter la maintenance et les évolutions futures.

Les objectifs du projet ont été définis afin de répondre aux besoins des utilisateurs tout en respectant les contraintes du MVP.

## 🎯 Cible du projet (Public visé)

L’application s’adresse à toute personne souhaitant organiser, suivre et découvrir des livres de manière simple et accessible.

### 📚 Lecteurs occasionnels

Le projet vise les personnes qui lisent de temps en temps et souhaitent garder une trace des livres qu’elles ont lus, qu’elles sont en train de lire ou qu’elles souhaitent lire plus tard.
L’application leur permet de gérer leur bibliothèque personnelle sans complexité.

### 📖 Lecteurs réguliers

Les lecteurs plus assidus peuvent utiliser l’application pour structurer leur bibliothèque, suivre leur progression de lecture et découvrir de nouveaux livres grâce à la navigation par genres, auteurs et coups de cœur.

### 👀 Utilisateurs en phase de découverte

Les visiteurs qui ne possèdent pas encore de compte peuvent consulter librement le catalogue afin de découvrir l’application avant de s’inscrire.
Cette approche permet de tester le service sans engagement.

### ♿ Utilisateurs ayant des besoins spécifiques

L’application prend en compte les utilisateurs ayant des besoins d’accessibilité, notamment les personnes ayant des difficultés de lecture ou de navigation.
Le mode accessibilité permet d’améliorer la lisibilité et le confort d’utilisation.

### 💻 Public général

L’application est destinée à un public large, sans connaissances techniques particulières, et accessible depuis un navigateur web sur ordinateur, tablette ou smartphone.

## 🚀 MVP – Minimum Viable Product

Le MVP correspond à la première version fonctionnelle de l’application.Il regroupe uniquement les fonctionnalités essentielles permettant de répondre aux objectifs du projet, sans complexité inutile.

## 👀 Fonctionnalités pour les visiteurs

Les visiteurs peuvent découvrir l’application sans créer de compte.

### 🏠 Accéder à la page d’accueil

La page d’accueil présente l’application et met en avant une sélection de livres coups de cœur des lecteurs, renouvelée régulièrement.

### 📚 Consulter le catalogue de livres

Les visiteurs peuvent parcourir la liste des livres disponibles et accéder aux informations principales.

### 🏷️ Naviguer par genres et auteurs

Les visiteurs peuvent découvrir les livres selon les genres littéraires ou les auteurs afin de faciliter la recherche et la découverte.

### 📖 Consulter le détail d’un livre

Les visiteurs peuvent accéder à la fiche d’un livre (titre, auteur, résumé, genre), sans possibilité de modifier les données.

### 🔍 Utiliser le moteur de recherche

Les visiteurs peuvent rechercher un livre, un genre ou un auteur rapidement.

### ♿ Activer le mode accessibilité

Les visiteurs peuvent activer un mode accessibilité afin d’améliorer la lisibilité et le confort de navigation.

### 🔐 Créer un compte et se connecter

Les visiteurs peuvent se créer un compte et se connecter de manière sécurisée afin d’accéder à leur espace personnel.

## 👤 Fonctionnalités pour les utilisateurs connectés

Les utilisateurs connectés disposent de fonctionnalités supplémentaires pour gérer leur bibliothèque personnelle.

### 🔐 se connecter

Les utilisateurs peuvent se connecter de manière sécurisée afin d’accéder à leur espace personnel.

### 📚 Gérer sa bibliothèque personnelle

Chaque utilisateur dispose d’une bibliothèque personnelle dans laquelle il peut consulter tous les livres qu’il a ajoutés.

### ➕ Ajouter et ➖ retirer des livres

Les utilisateurs peuvent ajouter des livres à leur bibliothèque ou les retirer à tout moment.

### ⏱️ Définir un statut de lecture

Pour chaque livre, l’utilisateur peut indiquer s’il est à lire, en cours de lecture ou déjà lu.

### ❤️ Marquer des livres comme coups de cœur

Les utilisateurs peuvent marquer des livres comme coups de cœur afin de participer à la mise en avant des recommandations.

### 📚 Rechercher des livres via une API externe

Les utilisateurs peuvent rechercher des livres via une API externe (Google Books) afin de faciliter l’ajout de nouveaux ouvrages.

### ♿ Utiliser le mode accessibilité

Les utilisateurs connectés peuvent également activer le mode accessibilité.

## 🔮 Évolutions potentielles du projet

Les fonctionnalités suivantes ne font pas partie du MVP.Elles représentent des pistes d’évolution possibles pour enrichir l’application dans le futur.

### 📤 Partage de bibliothèque

Il serait possible de permettre aux utilisateurs de rendre leur bibliothèque visible à d’autres utilisateurs.Cette fonctionnalité favoriserait l’échange autour des lectures et la découverte de nouvelles bibliothèques.

### ⭐ Avis et notes sur les livres

Les utilisateurs pourraient laisser un avis et attribuer une note à un livre.Cela permettrait d’enrichir les informations disponibles et d’aider les autres lecteurs à faire leur choix.

### 🎯 Recommandations personnalisées

L’application pourrait proposer des recommandations de livres basées sur :

	- les genres consultés,
	- les livres ajoutés à la bibliothèque,
	- les coups de cœur des utilisateurs.

### 📊 Statistiques de lecture

Les utilisateurs pourraient accéder à des statistiques personnelles, comme :

	- le nombre de livres lus,
	- le temps passé à lire,
	- les genres les plus consultés.

### 📱 Application mobile

Une version mobile de l’application pourrait être développée afin de permettre aux utilisateurs de gérer leur bibliothèque depuis leur smartphone ou leur tablette.

### 🔔 Notifications

L’application pourrait envoyer des notifications pour :

	- rappeler une lecture en cours,
	- suggérer de nouveaux livres,
	- informer des nouveautés du catalogue.

### 🌍 Partage social

Il serait possible de connecter l’application à des réseaux sociaux afin de partager ses coups de cœur ou sa bibliothèque.

### ♿ Accessibilité avancée

Le mode accessibilité pourrait être enrichi avec :

	- des options de personnalisation plus poussées,
	- une compatibilité avec des lecteurs d’écran,
	- des réglages spécifiques selon les besoins des utilisateurs.

## 🛠️ Choix technologiques et justifications

Les technologies choisies ont pour objectif de garantir une application simple à utiliser, facile à maintenir et évolutive, tout en restant cohérentes avec le périmètre du MVP.

### 🧱 Frontend – HTML5

HTML5 sera utilisé pour structurer les pages de l’application.

Justification du choix :

HTML5 permet de créer une structure claire et sémantique des pages.Il est essentiel pour :

	- l’accessibilité,
	- le référencement naturel (SEO),
	- la compatibilité avec les navigateurs modernes.

### 🎨 Frontend – Tailwind CSS

Tailwind CSS sera utilisé pour la mise en forme et le design de l’interface.

Justification du choix :

Tailwind CSS permet de créer rapidement des interfaces modernes et responsives grâce à ses classes utilitaires.Il facilite l’approche mobile first et assure une cohérence visuelle sur l’ensemble de l’application.

### 🟨 Frontend – JavaScript

JavaScript sera utilisé pour gérer les interactions dynamiques du site.

Justification du choix :

JavaScript permet de rendre l’application interactive (formulaires, actions utilisateur, affichage dynamique).Il est indispensable pour communiquer avec le backend via des requêtes HTTP et consommer les API.

### ⚙️ Backend – Node.js

Node.js sera utilisé comme environnement d’exécution côté serveur.

Justification du choix :

Node.js permet de développer des applications performantes et scalables.Il est bien adapté au développement d’API REST et s’intègre naturellement avec JavaScript.

### 🚏 Backend – Express.js

Express.js sera utilisé comme framework backend.

Justification du choix :

Express.js fournit une structure simple et légère pour gérer les routes, les requêtes HTTP et les middlewares.Il permet de construire une API REST claire et maintenable.

### 🐘 Backend – Laravel (PHP)

Laravel sera utilisé comme framework backend alternatif ou complémentaire.

Justification du choix :

Laravel propose une architecture MVC robuste et des outils intégrés pour la sécurité et la gestion des données.Il facilite la maintenance du code et l’évolution de l’application.


### 🗃️ ORM – Sequelize

Sequelize sera utilisé pour gérer les échanges avec la base de données.

Justification du choix :

Sequelize permet de manipuler les données via des modèles plutôt que des requêtes SQL complexes.Il facilite la gestion des relations et limite les erreurs de manipulation des données.

### 🐘 Base de données – PostgreSQL

PostgreSQL sera utilisé comme système de gestion de base de données.

Justification du choix :

PostgreSQL est une base de données relationnelle fiable et robuste.Elle est adaptée à la gestion de relations complexes et respecte les standards SQL.

### 📚 API externe – Google Books API

Google Books API sera utilisée pour enrichir le catalogue de livres.

Justification du choix :

Cette API permet de rechercher des livres par titre, auteur ou ISBN et de récupérer automatiquement leurs informations.Elle évite une saisie manuelle complète et améliore la qualité des données.

### 🔐 Sécurité – Authentification et bonnes pratiques

Un système d’authentification sécurisé sera mis en place.

Justification du choix :

L’utilisation de JWT permet de sécuriser les échanges entre le frontend et le backend.Les bonnes pratiques de sécurité (hashage des mots de passe, protection contre les failles courantes) garantissent la protection des données utilisateurs et la conformité RGPD.


### 📱 Responsive design & Mobile First

L’application sera conçue selon une approche mobile first.

Justification du choix :

Cette approche garantit une expérience utilisateur optimale sur tous les supports (mobile, tablette, ordinateur).

### ♿ Accessibilité – Normes WCAG

Les normes d’accessibilité seront respectées dès la conception.

Justification du choix :

Le respect des normes WCAG permet de rendre l’application utilisable par le plus grand nombre, notamment les personnes en situation de handicap.

### 🔍 SEO – Bonnes pratiques

Les bonnes pratiques de référencement naturel seront appliquées.

Justification du choix :

Une structure HTML sémantique et des URLs lisibles améliorent la visibilité de l’application sur les moteurs de recherche.

### 🌱 Éco-conception

Des principes d’éco-conception seront intégrés au développement.

Justification du choix :

L’optimisation des ressources et la limitation des requêtes inutiles permettent de réduire l’impact environnemental de l’application.


### 🚀 Déploiement – Docker

Docker sera utilisé pour le déploiement de l’application.

Justification du choix :

Docker garantit des environnements de développement et de production cohérents, facilitant le déploiement et la maintenance.

## 🌐 Compatibilité des navigateurs

L’application doit être accessible et utilisable sur les navigateurs web les plus courants, dans leurs versions récentes et maintenues, afin de garantir une expérience utilisateur fiable et cohérente.

L’application web sera conçue pour être compatible avec les navigateurs web récents sur ordinateur et mobile.
Elle prendra en charge Google Chrome, Mozilla Firefox, Microsoft Edge (Chromium) à partir de la version 100, ainsi que Safari à partir de la version 14.
Sur mobile, l’application sera compatible avec Chrome Mobile (Android) et Safari Mobile (iOS 14 et versions supérieures).
Le choix de ces versions garantit une compatibilité optimale avec les technologies web modernes utilisées dans le projet.

## 🌐 Routes Frontend

Voici la liste des routes frontend

				/ → Accueil
				/login → Connexion
				/register → Inscription
				/library → Ma bibliothèque (utilisateur connecté)
				/books → Catalogue / Recherche de livres
				/book/:id → Détail d’un livre
				/genres → Liste des genres
				/genre/:id → Détail d’un genre
				/authors → Liste des auteurs
				/author/:name → Détail d’un auteur
				/profile → Profil utilisateur

👉 Les routes livres / genres / auteurs / détails sont accessibles :

	- aux visiteurs (lecture seule)
	- aux utilisateurs connectés (avec actions supplémentaires)

### 🧭 Logique de navigation

	- Accueil est le point d’entrée principal
	- Depuis l’accueil, l’utilisateur peut :
			. se connecter / s’inscrire
			. explorer le catalogue
	-Les pages livre / genre / auteur sont accessibles à tous
	- Les pages library et profile nécessitent une connexion

## 🎨 Schéma d’arborescence


Ce schéma représente l’arborescence des routes frontend de l’application et illustre les principaux parcours utilisateurs.

![alt text](image.png)

## 📡 Tableau des Endpoints API et descriptions

### 📚 Gestion des livres (Catalogue)

| Verbe HTTP | URL            | Router       | Controller & Méthode        | Modèle & Méthodes | Description                       |
|------------|----------------|--------------|-----------------------------|-------------------|-----------------------------------|
| GET        | /books         | bookRouter  | bookController.getAll       | Book.findAll      | Lister tous les livres             |
| GET        | /books/:id     | bookRouter  | bookController.getById      | Book.findById     | Trouver un livre par son ID        |
| GET        | /books/search  | bookRouter  | bookController.search       | Book.findAll      | Rechercher un livre par mot-clé    |
| GET.       | /books/search/external | bookRouter | bookController.searchExternal | Google Books API | Rechercher un livre via une API externe  |

### 🧑‍💼 Authentification

| Verbe HTTP | URL            | Router       | Controller & Méthode        | Modèle & Méthodes | Description                                   |
|------------|----------------|--------------|-----------------------------|-------------------|-----------------------------------------------|
| POST       | /auth/register | authRouter  | authController.register     | User.create       | Créer un compte utilisateur                   |
| POST       | /auth/login    | authRouter  | authController.login        | User.findOne     | Connecter un utilisateur                     |



### 👤 Utilisateur

| Verbe HTTP | URL        | Router       | Controller & Méthode           | Modèle & Méthodes | Description                               |
|-----------|------------|--------------|---------------------------------|-------------------|-------------------------------------------|
| GET       | /users/me  | userRouter  | userController.getProfile       | User.findByPk     | Accéder au profil utilisateur connecté    |
| PUT       | /users/me  | userRouter  | userController.updateProfile    | User.update       | Modifier les informations du profil       |


### 📦 Bibliothèque personnelle

| Verbe HTTP | URL            | Router          | Controller & Méthode                 | Modèle & Méthodes | Description                                         |
|-----------|----------------|------------------|--------------------------------------|-------------------|-----------------------------------------------------|
| GET       | /library/me  | libraryRouter   | libraryController.getMyLibrary       | Library.findOne   | Accéder à la bibliothèque de l’utilisateur connecté |
| PUT       | /library/me  | libraryRouter   | libraryController.updateLibrary      | Library.update    | Modifier le nom de la bibliothèque                  |


### 📘 Livres dans la bibliothèque (statut de lecture)

| Verbe HTTP | URL                              | Router               | Controller & Méthode               | Modèle & Méthodes       | Description                          |
|-----------|----------------------------------|----------------------|------------------------------------|--------------------------|--------------------------------------|
| POST      | /library/books              | libraryBookRouter   | libraryBookController.addBook      | LibraryBook.create       | Ajouter un livre à la bibliothèque   |
| PUT     | /library/books/:bookId      | libraryBookRouter   | libraryBookController.updateStatus | LibraryBook.update       | Modifier le statut de lecture        |
| DELETE    | /library/books/:bookId      | libraryBookRouter   | libraryBookController.removeBook   | LibraryBook.destroy      | Retirer un livre de la bibliothèque  |


### 🏷️ Genres

| Verbe HTTP | URL          | Router        | Controller & Méthode       | Modèle & Méthodes | Description                         |
|-----------|--------------|---------------|-----------------------------|-------------------|-------------------------------------|
| GET       | /genres      | genreRouter  | genreController.getAll      | Genre.findAll     | Lister tous les genres               |
| GET       | /genres/:id  | genreRouter  | genreController.getById     | Genre.findByPk    | Accéder au détail d’un genre         |


### ✍️ Gestion des auteurs

| Verbe HTTP | URL               | Router        | Controller & Méthode          | Modèle & Méthodes | Description                    |
|------------|-------------------|---------------|--------------------------------|-------------------|--------------------------------|
| GET        | /authors          | writerRouter | authorController.getAll        | Author.findAll    | Lister tous les auteurs        |
| GET        | /authors/:id      | writerRouter | authorController.getOne        | Author.findByPk   | Afficher le détail d’un auteur |
| GET        | /authors/:id/books| writerRouter | authorController.getBooks      | Book.findAll      | Lister les livres d’un auteur  |


### 🔗 Association livres ↔ genres

| Verbe HTTP | URL                     | Router           | Controller & Méthode           | Modèle & Méthodes     | Description                          |
|------------|-------------------------|------------------|---------------------------------|------------------------|--------------------------------------|
| POST       | /books/:id/genres       | bookGenre.router | bookGenreController.addGenre    | BookGenre.create       | Associer un genre à un livre         |
| DELETE     | /books/:id/genres/:genreId | bookGenre.router | bookGenreController.removeGenre | BookGenre.destroy      | Supprimer l’association livre/genre |


### ❤️ Coups de cœur (favoris)

| Verbe HTTP | URL                     | Router           | Controller & Méthode                | Modèle & Méthodes | Description                                      |
|------------|-------------------------|------------------|--------------------------------------|-------------------|--------------------------------------------------|
| POST       | /books/:id/favorite     | favoriteRouter  | favoriteController.add               | Favorite.create   | Ajouter un livre aux coups de cœur               |
| DELETE     | /books/:id/favorite     | favoriteRouter  | favoriteController.remove            | Favorite.destroy  | Retirer un livre des coups de cœur               |
| GET        | /books/favorites/random | bookRouter      | bookController.getRandomFavorites    | Book.findAll      | Afficher une sélection aléatoire de coups de cœur|

### 🚨 Tableau des codes d’erreur HTTP

| Code | Signification          | Cas typique                                 |
|------|------------------------|---------------------------------------------|
| 200  | OK                     | Requête réussie (GET, PUT, PATCH)           |
| 201  | Created                | Ressource créée avec succès (POST)          |
| 204  | No Content             | Suppression réussie (DELETE)                |
| 400  | Bad Request            | Données manquantes ou invalides              |
| 401  | Unauthorized           | Authentification requise ou invalide         |
| 403  | Forbidden              | Accès refusé malgré l’authentification       |
| 404  | Not Found              | Ressource introuvable                        |
| 409  | Conflict               | Conflit lors de la création ou modification  |
| 500  | Internal Server Error  | Erreur interne du serveur                    |

## 🌐 User Stories

### 👀 User stories – Visiteur (non connecté)

| En tant que | Je veux                               | Afin de                                              |
|-------------|----------------------------------------|------------------------------------------------------|
| Visiteur    | Accéder à la page d’accueil            | Découvrir l’application                              |
| Visiteur    | Consulter la bibliothèque              | Voir les livres disponibles sans créer de compte     |
| Visiteur    | Naviguer par genres                    | Découvrir des livres selon mes préférences           |
| Visiteur    | Consulter la page d’un genre           | Voir les livres associés                             |
| Visiteur    | Consulter la liste des auteurs         | Découvrir leurs ouvrages                             |
| Visiteur    | Consulter la page d’un auteur          | Voir ses livres et ses genres associés               |
| Visiteur    | Consulter le détail d’un livre         | Lire le résumé et les informations principales       |
| Visiteur    | Me connecter ou m’inscrire             | Accéder à ma bibliothèque et la gérer                |
| Visiteur    | Utiliser le moteur de recherche        | Trouver rapidement un livre, genre ou auteur         |
| Visiteur    | Activer le mode accessibilité          | Améliorer la lisibilité de l’application             |
| Visiteur    | Filtrer les livres par auteur          | Découvrir ses ouvrages                               |

### 👤 User stories – Utilisateur connecté

| En tant que            | Je veux                                      | Afin de                                           |
|------------------------|-----------------------------------------------|---------------------------------------------------|
| Utilisateur connecté   | Accéder à ma bibliothèque                    | Voir tous les livres que j’ai ajoutés             |
| Utilisateur connecté   | Ajouter un livre à ma bibliothèque           | Gérer ma collection                               |
| Utilisateur connecté   | Retirer un livre de ma bibliothèque          | Maintenir ma collection à jour                    |
| Utilisateur connecté   | Définir un statut de lecture                 | Suivre l’avancement de mes lectures               |
| Utilisateur connecté   | Consulter le détail d’un livre               | L’ajouter ou le retirer de ma bibliothèque        |
| Utilisateur connecté   | Rechercher par titre, auteur, genre, ISBN    | Retrouver un livre facilement                    |
| Utilisateur connecté   | Modifier les infos d’un livre                | Corriger ou compléter ses données                 |
| Utilisateur connecté   | Activer le mode accessibilité                | Améliorer la lisibilité et l’accessibilité        |
| Utilisateur connecté   | Cliquer sur le bouton coeur d'un livre 		| Ajouter un livre à mes coups de coeur 			|

### 🌐 User stories – API externe (Google Books)

| En tant que | Je veux                                      | Afin de                                      |
|-------------|-----------------------------------------------|----------------------------------------------|
| Utilisateur | Rechercher un livre via une API externe      | Préremplir automatiquement ses informations |
| Utilisateur | Modifier les données récupérées via l’API    | Garder le contrôle sur mes livres            |

### 🔮 User stories – Évolutions futures 

| En tant que | Je veux                                   | Afin de                                   |
|-------------|--------------------------------------------|-------------------------------------------|
| Utilisateur | Laisser un avis sur un livre              | Partager mon opinion avec d’autres lecteurs|
| Utilisateur | Noter un livre                            | Évaluer mes lectures                      |
| Utilisateur | Recevoir des recommandations personnalisées| Découvrir de nouveaux livres              |
| Utilisateur | Partager ma bibliothèque                  | Permettre à d’autres d’y accéder          |
| Utilisateur | Accéder à ma bibliothèque sur mobile      | Gérer mes lectures en mobilité            |

