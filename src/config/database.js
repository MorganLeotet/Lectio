/* ==== IMPORT ==== */

import { Sequelize } from 'sequelize';

/* ==== SEQUELIZE CONFIGURATION ==== */

const sequelize = new Sequelize(
    process.env.DB_NAME || "lectio",
    process.env.DB_USER || "postgres",
    process.env.DB_PASSWORD || "postgres",
    {
        host: process.env.DB_HOST || "localhost",
        port: process.env.DB_PORT || 5432,
        dialect: "postgres",
        logging: false
    }
);

/* ==== EXPORT ==== */

export default sequelize;