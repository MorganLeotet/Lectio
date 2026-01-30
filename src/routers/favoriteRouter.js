/* ==== IMPORT ==== */

import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import favoriteController from '../controllers/favoriteController.js';

/* ==== ROUTER INITIALIZATION === */

const router = Router();

/* ==== ROADS ==== */

router.post('/', authMiddleware, favoriteController.addFavorite);           // ajouter un favori

router.get('/', authMiddleware, favoriteController.getfavorite);            // voir les favoris

router.delete('/:id_book', authMiddleware, favoriteController.deleteFavorite);      // supprimer un favori



/* ==== EXPORT ==== */

export default router;