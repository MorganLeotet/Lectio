/* ==== IMPORT ==== */

import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import userController from '../controllers/userController.js';

/* ==== ROUTER INITIALIZATION ==== */

const router = Router();

/* ==== ROADS ==== */

router.get('/me', authMiddleware, userController.getProfile);

router.put('/me', authMiddleware, userController.updateProfile);

/* ==== EXPORT ==== */

export default router;