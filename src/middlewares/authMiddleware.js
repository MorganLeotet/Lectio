/* ==== IMPORT ==== */
import jwt from "jsonwebtoken";

/* ==== AUTH MIDDLEWARE ==== */

const authMiddleware = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "Token manquant"
        });
    }

    const parts = authHeader.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
        return res.status(401).json({
            message: "Format de token invalide"
        });
    }

    const token = parts[1];

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = decoded.userId;

        next();

    } catch (error) {

        return res.status(401).json({
            message: "Token invalide ou expiré"
        });

    }
};

export default authMiddleware;