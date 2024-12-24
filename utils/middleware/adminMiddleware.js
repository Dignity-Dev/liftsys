const jwt = require('jsonwebtoken');

const authorize = (req, res, next) => {
    try {
        const token = req.cookies.token; // Get the token from cookies

        if (!token) {
            return res.redirect("/sign-in");
        }

        const decodedToken = jwt.verify(token, process.env.SECRET);

        if (decodedToken.userType !== 'admin') {
            return res.status(403).json({ message: 'Access denied: Insufficient permissions' });
        }

        req.user = decodedToken;

        next();
    } catch (error) {
        console.error('Authorization Error:', error.message);

        if (error.name === 'TokenExpiredError') {
            return res.redirect("/sign-in");
        }

        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

module.exports = authorize;
