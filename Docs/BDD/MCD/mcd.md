# MCD (Modèle Conceptuel De Donnée)

## Relations

### 👤 USER <——-> 📦 LIBRARY

USER (1,1) — OWNS — LIBRARY (1,1)

Chaque utilisateur possède une seule bibliothèque personnelle, et chaque bibliothèque appartient à un seul
utilisateur.


### 📦 LIBRARY <——>  📘 BOOK

LIBRARY (1,N) — CONTAINS — BOOK (0,N)

Attribut de relation : reading_status

Une bibliothèque contient un ou plusieurs livres, un livre peut être présent dans plusieurs bibliothèques et pour
chaque livre un statut de lecture est défini.


### 👤 USER <——> 📘 BOOK

USER (O,N) — LIKES — BOOK (0,N)

Un utilisateur peut aimer zéro, un ou plusieurs livres, et un livre peut être aimé par zéro, un ou plusieurs
utilisateurs.

### 📘 BOOK <——> 🏷️ GENRE

BOOK (1,N) — BELONG_TO — GENRE (0,N)

Un livre appartient à un ou plusieurs genres, et un genre peut être associé à plusieurs livres.

### 📘 BOOK <——>  ✍️ AUTHOR

BOOK (1,1) —— WRITTEN BY —— AUTHOR (1,N)

Un livre est écrit par un auteur , et un auteur peut écrire plusieurs livres.

## 📘 Relecture finale du Modèle Conceptuel de Données (MCD)

Le modèle conceptuel de données décrit les entités principales de l’application Lectio ainsi que les relations
qui existent entre elles, indépendamment de toute considération technique.
Il permet de représenter les règles de gestion et les besoins fonctionnels de l’application de gestion de
bibliothèque.

Les utilisateurs sont représentés par l’entité **USER**.
Un utilisateur correspond à une personne utilisant l’application. Il possède un compte personnel lui permettant
d’accéder aux fonctionnalités de gestion de bibliothèque, de suivi de lecture et d’interaction avec les livres.
Chaque utilisateur est identifié de manière unique par son adresse email.

Chaque utilisateur possède une bibliothèque personnelle, représentée par l’entité **LIBRARY**.
Une bibliothèque appartient à un seul utilisateur et ne peut pas exister sans lui.
Elle permet de regrouper l’ensemble des livres que l’utilisateur souhaite gérer et suivre dans le temps.

Les livres sont représentés par l’entité **BOOK**.
Un livre correspond à une œuvre littéraire disponible dans l’application.
Il est décrit par des informations générales telles que son titre, son résumé, sa date de publication, sa couverture et
un indicateur de coup de cœur.
Un livre peut être présent dans plusieurs bibliothèques différentes.

Les auteurs sont représentés par l’entité **AUTHOR**.
Un auteur correspond à la personne ayant écrit un ou plusieurs livres.
Chaque auteur est identifié de manière unique et possède une biographie permettant de présenter son parcours
ou son univers.
Un auteur peut écrire plusieurs livres, mais chaque livre est écrit par un seul auteur.

Les genres littéraires sont représentés par l’entité **GENRE**.
Un genre permet de classer les livres par catégorie (roman, science-fiction, polar, etc.).
Un livre doit appartenir à au moins un genre, et un genre peut être associé à plusieurs livres.

La relation **CONTIENT** relie les entités **LIBRARY** et **BOOK**.
Elle permet de représenter le fait qu’une bibliothèque contient des livres.
Cette relation porte l’attribut statut de lecture, qui indique l’avancement de lecture d’un livre dans une bibliothèque
donnée (à lire, en cours, lu).
Le statut de lecture dépend donc de la bibliothèque et non du livre lui-même.

La relation **APPARTIENT** relie les entités **BOOK** et **GENRE**.
Elle permet d’associer un livre à un ou plusieurs genres et de regrouper plusieurs livres sous un même genre.

La relation **ÉCRIT** relie les entités **AUTHOR** et **BOOK**.
Elle traduit le fait qu’un auteur peut écrire plusieurs livres, tandis qu’un livre est écrit par un seul auteur.

Enfin, la relation **AIME** relie les entités **USER** et **BOOK**.
Elle permet à un utilisateur d’indiquer qu’il apprécie un livre.
Cette relation est utilisée pour identifier les coups de cœur des lecteurs et alimenter les sélections mises en avant
sur la page d’accueil.