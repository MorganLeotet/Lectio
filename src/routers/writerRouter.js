/* ==== IMPORT ==== */

import { Router } from 'express';
import writerController from '../controllers/writerController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

/* ==== ROUTER INITIALIZATION ==== */

const router = Router();

/* ==== ROADS ==== */

router.get('/', authMiddleware, writerController.getAll);

router.get('/:id', authMiddleware, writerController.getById);

router.get('selected/:id', (req, res) => {
    res.sendFile(path.join(process.cwd)(), 'public/pages/authors_selected.html');
});

/* ==== EXPORT ==== */

export default router;