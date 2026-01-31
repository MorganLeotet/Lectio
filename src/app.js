/* ==== IMPORT ==== */

import express from 'express';
import { join } from 'node:path';

import bookRouter from './routers/bookRouter.js';
import authRouter from './routers/authRouter.js';
import libraryRouter from './routers/libraryRouter.js';
import favoriteRouter from './routers/favoriteRouter.js';
import genreRouter from './routers/genreRouter.js'
import writerRouter from './routers/writerRouter.js';
import userRouter from './routers/userRouter.js';


/* ==== APP INITIALIZATION ==== */
const app = express();

/* ==== EJS CONFIGURATION ==== */
app.set('views', join(import.meta.dirname, 'src/views'));
app.set('view engine', 'ejs');

/* ==== STACTIC FILES ==== */
app.use(express.static(join(import.meta.dirname, '../public')));

/* ==== MIDDLEWARES ==== */
app.use(express.json());            /* pour lire le Json envoyé par le navigateur */

/* ==== ROADS ==== */

app.get('/', (req, res) => {
    res.send('Welcome');
})

/* ==== AUTH ROAD ==== */
app.use('/auth', authRouter);

/* ==== BOOK ROAD ==== */
app.use('/books', bookRouter);

/* ==== LIBRARY ROAD ==== */
app.use('/library', libraryRouter);

/* ==== FAVORITE ROAD ==== */
app.use('/favorites', favoriteRouter);

/* ==== GENRE ROAD ==== */
app.use('/genres', genreRouter);

/* ==== AUTHOR ROAD ==== */
app.use('/authors', writerRouter);

/* ==== USER ROAD ==== */
app.use('/users', userRouter);






/* ==== EXPORT ==== */

export default app;