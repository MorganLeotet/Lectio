import 'dotenv/config';

/* ==== IMPORT ==== */

import app from './app.js';
import sequelize from './config/database.js';
import { seedUser } from "./config/seedUser.js";
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

await seedUser();

/* ==== SERVER ==== */

const port = process.env.PORT || 3000;
const base_url = process.env.BASE_URL || 'http://localhost';

app.listen(port, '0.0.0.0' , () => {
    console.log(`Server running:`);
    console.log(`Local:   http://localhost:${port}`);
    console.log(`Mobile:  http://192.168.1.154:${port}`);
});