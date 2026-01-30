# MLD (Modèle Logique de Donnée)

Le Modèle Logique de Données décrit la structure de la base de données relationnelle de l’application
Lectio.
Il précise les tables, leurs champs, les clés primaires et les relations entre les entités, en cohérence avec le MCD et
les fonctionnalités du MVP.

## 🧑 USERS

USERS (
id_user PK,
mail UNIQUE,
name,
password,
created_at,
updated_at
)

La table **USERS** stocke les informations des utilisateurs de l’application.
Chaque utilisateur possède un compte personnel lui permettant d’accéder à sa bibliothèque et aux fonctionnalités
avancées.
    • Chaque utilisateur est identifié de manière unique.
    • L’adresse email permet l’authentification.
    • Les dates de création et de mise à jour permettent le suivi du compte.

👉 Un utilisateur peut accéder à une ou plusieurs bibliothèques selon les droits définis


## 📚 LIBRARIES

LIBRARIES (
id_library PK,
name,
id_user FK UNIQUE,
created_at,
updated_at
)

La table **LIBRARIES** représente les bibliothèques créées par les utilisateurs.
    • Une bibliothèque appartient à un utilisateur.
    • Elle regroupe une sélection de livres.
    • Elle permet de gérer les livres et leur statut de lecture.

👉 Une bibliothèque peut contenir plusieurs livres.

## ✍️ AUTHORS

AUTHORS (
id_author PK,
name,
bio
)

La table **AUTHORS** stocke les informations sur les auteurs.
    • Chaque auteur est identifié de manière unique.
    • Un auteur possède un nom et une biographie (bio).
    • La biographie permet d’afficher une présentation sur la page auteur.

👉 Un auteur peut être associé à plusieurs livres.


## 📘 BOOKS

BOOKS (
id_book PK,
isbn UNIQUE,
title,
summary,
description,
publication_date,
cover
created_at,
updated_at,
)

La table **BOOKS** contient les informations relatives aux livres disponibles dans l’application.
Chaque livre est décrit par :
    • son titre
    • son résumé et sa description
    • sa date de publication
    • sa couverture
    • un indicateur de coup de cœur

👉 Un livre :
    • est écrit par un seul auteur
    • peut appartenir à plusieurs bibliothèques
    • peut être associé à un ou plusieurs genres


## 🏷 GENRES

GENRES (
id_genre PK,
name
)

La table **GENRES** regroupe les genres littéraires.
    • Chaque genre est identifié de manière unique.
    • Un genre peut être partagé par plusieurs livres.

👉 Un livre doit appartenir à au moins un genre.


## 🔗 LIBRARY_BOOK

### 👉 Association N–N

LIBRARY_BOOK (
id_library FK,
id_book FK,
reading_satus,
PK (id_library, id_book)
)

La table LIBRARY_BOOK est une table de liaison entre les bibliothèques et les livres.
Elle permet :
    • d’associer un livre à une bibliothèque
    • de stocker le statut de lecture du livre pour une bibliothèque donnée

👉 Cette table traduit la relation **CONTIENT** du MCD.
    • Une bibliothèque peut contenir plusieurs livres.
    • Un livre peut être présent dans plusieurs bibliothèques.
    • Le statut de lecture dépend de la bibliothèque et non du livre lui-même.


## 🔗 USER_FAVORITE_BOOK

### 👉 Association N–N

👉 Gère les coups de cœur

USER_FAVORITE_BOOK (
id_user FK,
id_book FK,
PK (id_user, id_book)
)

La relation **AIME** permet à un utilisateur d’indiquer ses coups de cœur.
    • Un utilisateur peut aimer plusieurs livres.
    • Un livre peut être aimé par plusieurs utilisateurs.
Cette relation est utilisée pour alimenter les sélections « coups de cœur des lecteurs ».


## 🔗 BOOK_GENRE

### 👉 Association N–N

BOOK_GENRE (
id_book FK,
id_genre FK,
PK (id_book, id_genre)
)

La table **BOOK_GENRE** permet d’associer les livres aux genres littéraires.
👉 Cette table traduit une relation N–N.
    • Un livre appartient à un ou plusieurs genres.
    • Un genre peut regrouper plusieurs livres.
    • La clé primaire composée garantit l’unicité des associations.


## 🔗 Relation BOOKS ↔ AUTHORS

La relation entre les livres et les auteurs est une relation 1–N.
    • Un auteur peut écrire plusieurs livres.
    • Un livre est écrit par un seul auteur.
Cette relation est matérialisée par une clé étrangère id_author dans la table **BOOKS**.

## 📘 Lecture complète du MLD

Le modèle logique de données représente la structure des données nécessaires au fonctionnement de l’application
de gestion de bibliothèque Lectio.
Il définit les différentes tables de la base de données ainsi que les relations entre elles afin d’assurer une gestion
cohérente des utilisateurs, des livres et de leurs bibliothèques.

Les utilisateurs sont enregistrés dans la table **USERS**.
Chaque utilisateur est identifié de manière unique par son adresse email et dispose d’un compte personnel lui
permettant d’accéder aux fonctionnalités de l’application, notamment la gestion de sa bibliothèque et le suivi de
ses lectures.

Chaque utilisateur possède une bibliothèque personnelle, enregistrée dans la table **LIBRARIES**.
Une bibliothèque appartient à un seul utilisateur et permet de regrouper l’ensemble des livres qu’il souhaite gérer.
Elle constitue l’espace central de gestion des lectures pour chaque utilisateur.

Les livres sont stockés dans la table **BOOKS**.
Cette table contient les informations principales relatives aux livres, telles que le titre, le résumé, la description, la
date de publication, la couverture ainsi qu’un indicateur de coup de cœur.
Chaque livre est écrit par un auteur unique, identifié grâce à une clé étrangère faisant référence à la table
**AUTHORS**.

Les auteurs sont enregistrés dans la table **AUTHORS**.
Cette table permet de stocker le nom de l’auteur ainsi qu’une biographie servant à présenter son parcours ou son
univers.
Un auteur peut être associé à plusieurs livres, ce qui permet d’effectuer des recherches et des filtres fiables par
auteur, ainsi que d’afficher une page auteur détaillée.

Les genres littéraires sont stockés dans la table **GENRES**.
Un genre permet de classer les livres par catégorie littéraire. Un même genre peut être partagé par plusieurs livres,
et chaque livre doit appartenir à au moins un genre.

L’association entre les livres et les genres est gérée par la table de liaison **BOOK_GENRE**.
Cette table permet d’associer un livre à un ou plusieurs genres et garantit la cohérence des classifications littéraires
au sein de l’application.

La relation entre les bibliothèques et les livres est gérée par la table de liaison **LIBRARY_BOOK**.
Cette table permet de déterminer quels livres sont présents dans une bibliothèque donnée et d’associer à chaque
livre un statut de lecture (à lire, en cours, lu).
Le statut de lecture dépend de la bibliothèque et non du livre lui-même, ce qui permet à un même livre d’avoir des
statuts différents selon les bibliothèques.

Enfin, une relation optionnelle permet aux utilisateurs d’indiquer leurs coups de cœur pour certains livres.
Cette information est utilisée pour mettre en avant les livres appréciés par la communauté, notamment dans la
section « coups de cœur des lecteurs » de la page d’accueil.