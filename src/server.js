/* ==== IMPORT ==== */

import app from './app.js';
import 'dotenv/config.js';
import sequelize from './config/database.js';

import './models/index.js';


/* ==== SEQUELIZE ==== */

(async () => {

    try {

        await sequelize.authenticate();
        console.log('✅ Connexion PostgreSQL ok')

    } catch (error) {

    console.error('❌ Erreur DB :', error);

    }
})();




/* ==== SERVER ==== */

const port = process.env.PORT || 3000;
const base_url = process.env.BASE_URL || 'http://localhost';

app.listen(port, () => {
    console.log(`Server ok on ${base_url}:${port}`)
});