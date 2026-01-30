/* ==== IMPORT ==== */
import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import libraryController from '../controllers/libraryController.js';

/* ==== ROUTER CONFIGURATION ==== */

const router = Router();

/* ==== ROAD ==== */

router.get('/', authMiddleware, libraryController.getMyLibrary);

router.post('/books', authMiddleware, libraryController.addBookToLibrary);

router.put('/books/:bookId', authMiddleware, libraryController.updateReadingStatus);

router.delete('/books/:bookId', authMiddleware, libraryController.deleteBookFromLibrary);

router.put('/name', authMiddleware, libraryController.updateLibraryName);




/* ==== EXPORT ==== */

export default router;