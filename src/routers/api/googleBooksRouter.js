import { Router } from "express";
import googleBooksController from "../../controllers/googleController.js";

const router = Router();

/* ============================= /
/ GOOGLE BOOKS ROUTES /
/ ============================= */

/* Recherche de livres */

router.get("/search", googleBooksController.search);

/* ==== EXPORT ==== */

export default router;