const jwt = require("jsonwebtoken");

const verifyAuth = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
        return res.status(403).json({ message: 'Token no proporcionado' });
    }
    jwt.verify(token, 'gato',{ ignoreExpiration: true }, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido' });
        }

        req.userId = decoded.userId;
        req.username = decoded.username
        next();
    });
}

module.exports = verifyAuth