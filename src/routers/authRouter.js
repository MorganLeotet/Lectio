/* ==== IMPORT ==== */

import { Router } from 'express';
import { authController } from '../controllers/authController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

/* ==== ROUTER INITIALIZATION ==== */
const router = Router();

router.post('/register', authController.register);          // INSCRIPTION

router.post('/login', authController.login);                // CONNEXION

router.get('/me', authMiddleware, (req, res) => {           // ROUTE PROTEGEE
    res.json({
        user: req.user
    })
})


/* ==== EXPORT ==== */

export default router;