/* ==== IMPORT ==== */

import { Genre, Book } from '../models/index.js';

const genreController  = {

        getAll: async (req, res) => {

            try {
                const genres = await Genre.findAll();
                res.json(genres);
            } catch (error) {
                res.status(500).json({
                    message: 'Erreur Serveur'
                });
            }
        },

        getById: async (req, res) => {

            try {
                const genre = await Genre.findByPk(req.params.id, {
                    include: Book
                });

                if (!genre) {
                    return res.status(404).json({
                        message: 'Genre non trouvé'
                    });
                }
                res.json(genre);
            } catch (error) {
                res.status(500).json({
                    message: 'Erreur Serveur'
                });
            }
        }
};

/* ==== EXPORT ==== */

export default genreController;
