# Dictionnaire des Données

## 📘 Table USER

### 📌 Description générale

La table USER contient les informations des utilisateurs de l’application.
Elle permet d’identifier chaque utilisateur, de gérer l’authentification et d’associer un utilisateur à sa bibliothèque
personnelle.

| Champ       | Description                                   | Type           | Contraintes                          |
|-------------|-----------------------------------------------|----------------|--------------------------------------|
| id_user     | Identifiant unique de l’utilisateur           | INTEGER        | PK, auto_increment                   |
| mail        | Adresse mail de l’utilisateur                 | VARCHAR(150)   | UNIQUE, NOT NULL                     |
| name        | Nom ou pseudo de l’utilisateur                | VARCHAR(100)   | NOT NULL                             |
| password    | Mot de passe de l’utilisateur (hashé)         | VARCHAR(255)   | NOT NULL                             |
| created_at  | Date de création du compte utilisateur        | TIMESTAMP      | DEFAULT CURRENT_TIMESTAMP            |
| updated_at  | Date de dernière mise à jour du compte        | TIMESTAMP      | NULL                                 |


🔑 Clé primaire : id_user est la clé primaire de la table USER.

### 🧠 Remarques de conception

Cette table représente l’entité USER du MCD.
Chaque utilisateur est identifié de manière unique et possède une seule bibliothèque personnelle.
Les informations stockées permettent l’authentification et la gestion du compte utilisateur.
La clé primaire garantit l’unicité de chaque utilisateur dans le système.


## 📘 Table LIBRARY

### 📌 Description générale

La table LIBRARY représente les bibliothèques personnelles des utilisateurs.
Chaque bibliothèque appartient à un seul utilisateur et regroupe les livres qu’il a ajoutés à sa collection.

| Champ       | Description                              | Type         | Contraintes                              |
|------------|-------------------------------------------|--------------|-------------------------------------------|
| id_library | Identifiant unique de la bibliothèque     | INTEGER      | PK                                        |
| name       | Nom de la bibliothèque                    | VARCHAR(100) | NOT NULL                                  |
| id_user    | Propriétaire de la bibliothèque           | INTEGER      | FK → USERS(id_user), UNIQUE               |
| created_at | Date de création                          | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP                 |
| updated_at | Date de dernière mise à jour              | TIMESTAMP    | NULL                                      |


🔑 Clé primaire :id_library est la clé primaire de la table LIBRARY.

### 🧠 Remarques de conception

Cette table traduit la relation OWNS du MCD entre USERS et LIBRARIES.
Chaque bibliothèque est obligatoirement associée à un seul utilisateur.
La contrainte d’unicité sur l’identifiant utilisateur garantit qu’un utilisateur ne peut posséder qu’une seule
bibliothèque.

## ✍️ Table AUTHORS

### 📌 Description générale

La table AUTHORS contient les informations des auteurs des livres.

| Champ      | Description              | Type          | Contraintes              |
|-----------|--------------------------|---------------|--------------------------|
| id_author | Identifiant de l’auteur  | INTEGER       | PK, auto_increment       |
| name      | Nom de l’auteur          | VARCHAR(150)  | NOT NULL                 |
| bio       | Biographie courte        | TEXT          | NULL                     |
| created_at| Date de création         | TIMESTAMP     | NOT NULL                 |
| updated_at| Date de mise à jour      | TIMESTAMP     | NOT NULL                 |


### 🧠 Remarques de conception

    • Un auteur peut être associé à plusieurs livres.
    • Cette table permet une recherche fiable par auteur.


## 📘 Table BOOK

### 📌 Description générale

La table BOOK contient les informations générales sur les livres disponibles dans l’application.
Ces informations sont indépendantes des utilisateurs et des bibliothèques.

| Champ            | Description                       | Type           | Contraintes                     |
|------------------|-----------------------------------|----------------|----------------------------------|
| id_book          | Identifiant du livre              | INTEGER        | PK                               |
| isbn             | Code ISBN                         | VARCHAR(20)    | UNIQUE                           |
| title            | Titre du livre                    | VARCHAR(200)   | NOT NULL                         |
| summary          | Résumé                            | TEXT           | NULL                             |
| description      | Description détaillée             | TEXT           | NULL                             |
| publication_date | Date de publication               | DATE           | NULL                             |
| cover            | Couverture                        | VARCHAR(255)   | NULL                             |
| id_author        | Auteur                            | INTEGER        | NOT NULL                         |
| created_at       | Date de création                  | TIMESTAMP      | DEFAULT CURRENT_TIMESTAMP        |
| updated_at       | Date de mise à jour               | TIMESTAMP      | NULL                             |


🔑 Clé primaire :id_book est la clé primaire de la table BOOK.

### 🧠 Remarques de conception

Cette table représente l’entité BOOK du MCD.
Elle contient les informations générales sur les livres, indépendantes des utilisateurs et des bibliothèques.
Un même livre peut être présent dans plusieurs bibliothèques et associé à plusieurs genres.
La clé primaire garantit l’identification unique de chaque livre.

## 📘 Table GENRES

### 📌 Description générale

La table GENRES permet de gérer les genres littéraires.
Elle sert à classer les livres par catégorie afin de faciliter la navigation et la recherche.

| Champ    | Description              | Type         | Contraintes |
|---------|--------------------------|--------------|-------------|
| id_genre| Identifiant du genre     | INTEGER      | PK          |
| name    | Nom du genre             | VARCHAR(100) | NOT NULL    |


🔑 Clé primaire : id_genre est la clé primaire de la table GENRES.

### 🧠 Remarques de conception

Cette table représente l’entité GENRE du MCD.
Elle permet de classer les livres par catégories littéraires afin de faciliter la navigation.
Un genre peut être associé à aucun, un ou plusieurs livres.
La clé primaire garantit l’unicité de chaque genre.


## 📘 Table LIBRARY_BOOK

### 📌 Description générale

La table LIBRARY_BOOK est une table de liaison entre les bibliothèques et les livres.
Elle permet de savoir quels livres sont présents dans une bibliothèque et de stocker le statut de lecture associé à
chaque livre.

| Champ         | Description                        | Type    | Contraintes                                      |
|---------------|------------------------------------|---------|--------------------------------------------------|
| id_library    | Bibliothèque                       | INTEGER | PK, FK → LIBRARIES(id_library)                   |
| id_book       | Livre                              | INTEGER | PK, FK → BOOKS(id_book)                          |
| reading_status| Statut de lecture                  | ENUM    | NOT NULL                                         |


🔑 Clé primaire :La clé primaire est composée des champs id_library et id_book.

### 🧠 Remarques de conception

Cette table traduit la relation CONTAINS du MCD entre LIBRARIES et BOOKS.
Elle permet d’associer des livres à une bibliothèque et de stocker le statut de lecture propre à chaque livre dans ce
contexte.
Un même livre peut appartenir à plusieurs bibliothèques avec des statuts de lecture différents.
La clé primaire composée garantit l’unicité de chaque association entre une bibliothèque et un livre.


## 📘 Table USER_FAVORITE_BOOK

### 📌 Description générale
`
La table USER_FAVORITE_BOOK permet de gérer les coups de cœur des utilisateurs.
Elle associe un utilisateur aux livres qu’il a marqués comme favoris.

| Champ    | Description          | Type    | Contraintes                         |
|---------|----------------------|---------|-------------------------------------|
| id_user | Utilisateur          | INTEGER | PK, FK → USERS(id_user)             |
| id_book | Livre                | INTEGER | PK, FK → BOOKS(id_book)             |


🔑 Clé primaire : La clé primaire est composée des champs id_user et id_book.

### 🧠 Remarques de conception

Cette table traduit la relation LIKES du MCD entre USERS et BOOKS.
Elle permet à un utilisateur de marquer des livres comme coups de cœur.
Un utilisateur peut aimer plusieurs livres, et un livre peut être aimé par plusieurs utilisateurs.
La clé primaire composée garantit qu’un utilisateur ne peut marquer un même livre qu’une seule fois comme
favori.


## 📘 Table BOOK_GENRE

### 📌 Description générale

La table BOOK_GENRE est une table de liaison entre les livres et les genres.
Elle permet d’associer un livre à un ou plusieurs genres et de partager un genre entre plusieurs livres.

| Champ    | Description | Type    | Contraintes                         |
|---------|-------------|---------|-------------------------------------|
| id_book | Livre       | INTEGER | PK, FK → BOOKS(id_book)             |
| id_genre| Genre       | INTEGER | PK, FK → GENRES(id_genre)           |


🔑 Clé primaire :La clé primaire est composée des champs id_book et id_genre.

### 🧠 Remarques de conception

Cette table traduit la relation BELONGS_TO du MCD entre BOOKS et GENRES.
Un livre doit être associé à au moins un genre.
Un genre peut être associé à plusieurs livres.
La clé primaire composée garantit l’unicité des associations.
Un livre appartient à un ou plusieurs genres, et un genre peut regrouper plusieurs livres.