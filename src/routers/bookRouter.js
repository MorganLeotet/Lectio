/* ==== IMPORT ==== */
import { Router } from 'express';
import bookController from '../controllers/bookController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

/* ==== ROUTER INITIALIZATION === */
const router = Router();

/* ==== ROADS ==== */

router.get('/', authMiddleware, bookController.getAllBooks);            // voir tous les livres

router.get('/:id', authMiddleware, bookController.getBookById);         // voir un livre

router.post('/', authMiddleware, bookController.createBook);            // créer un livre

router.put('/:id', authMiddleware, bookController.updateBook);          // mettre à jour un livre

router.delete('/:id', authMiddleware, bookController.deleteBook);       // retirer un livre


/* ==== EXPORT ==== */

export default router;
