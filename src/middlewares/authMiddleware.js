
/* ==== AUTH MIDDLEWARE ==== */

const authMiddleware = (req, res, next) => {

    if (!req.session.user) {
        return res.status(401).json({
        message: "Non authentifié"
        });
    }

    req.userId = req.session.user.id;

    next();
};

export default authMiddleware;