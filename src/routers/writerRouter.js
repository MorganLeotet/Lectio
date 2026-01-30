/* ==== IMPORT ==== */

import { Router } from 'express';
import writerController from '../controllers/writerController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

/* ==== ROUTER INITIALIZATION ==== */

const router = Router();

/* ==== ROADS ==== */

router.get('/', authMiddleware, writerController.getAll);

router.get('/:id', authMiddleware, writerController.getById);

/* ==== EXPORT ==== */

export default router;