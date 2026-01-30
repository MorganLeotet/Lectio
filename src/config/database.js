/* ==== IMPORT ==== */

import { Sequelize } from 'sequelize';

/* ==== SEQUELIZE CONFIGURATION ==== */

const sequelize = new Sequelize(              // on crée la connexion à postgreSQL

    'Lectio',       // nom de la BDD
    'postgres',         // utilisateur PostgreSQL
    '#Jarvis91',         // le password

    {
        host: 'localhost',      // PostgreSQL est en local
        dialect: "postgres",     // type de bas
        logging: false          // on coupe les logs SQL pour le moment
    }

);

/* ==== EXPORT ==== */

export default sequelize;