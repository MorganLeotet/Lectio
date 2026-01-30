/* ==== IMPORT ==== */

import { Router } from 'express';
import genreController from '../controllers/genreController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

/* ==== ROUTER INITIALIZATION ==== */

const router = Router();

/* ==== ROADS ==== */

router.get('/', authMiddleware, genreController.getAll);

router.get('/:id', authMiddleware, genreController.getById);

/* ==== EXPORT ==== */

export default router;