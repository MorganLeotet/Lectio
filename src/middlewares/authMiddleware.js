/* ==== IMPORT ==== */
import jwt from 'jsonwebtoken';

/* ==== MIDDLEWARE INITIALIZATION ==== */

const authMiddleware = (req, res, next) => {
    
    const authHeader = req.headers.authorization;           // on récupère le header Authorization (thunder client)


    if (!authHeader) {                                      // verif s'il existe
        return res.status(401).json({
            message: 'Token manquant'
        });
    }

    const token = authHeader.split(' ')[1];                  // le format attendu : Bearer + token

    if (!token) {                                   
        return res.status(401).json({
            message: 'Token Invalide'
        });
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);          // verif du token

        req.user = decoded;         // on attache l'utilisateur à la requête

        next();         // on continue vers la route
    } catch (error) {
        return res.status(401).json({
            message: 'Token invalide ou expiré'
        });
    }

};

/* ==== EXPORT ==== */

export default authMiddleware;
