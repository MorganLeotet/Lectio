/* ==== IMPORT ==== */

import { Author, Book } from '../models/index.js';

const writerController  = {

    getAll: async (req, res) => {

        try {
            const authors = await Author.findAll();
            res.json(authors);
        } catch (error) {
            res.status(500).json({
                message: 'Erreur Serveur'
            });
        }
    },

    getById: async (req, res) => {
        
        try {
            const author = await Author.findByPk(req.params.id, {
                include: Book
            });

            if (!author) {
                return res.status(404).json({
                    message: 'Auteur non trouvé'
                });
            }
            res.json(author);
        } catch (error) {
            res.status(500).json({
                message: 'Erreur Serveur'
            });
        }
    }

};

/* ==== EXPORT ==== */

export default writerController;
