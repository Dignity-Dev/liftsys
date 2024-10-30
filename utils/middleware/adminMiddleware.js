const jwt = require('jsonwebtoken');

const authorize = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.redirect("/sign-in?error=Authorization token is missing");
        }

        const decodedToken = jwt.verify(token, process.env.SECRET);

        if (decodedToken.userType !== 'admin') {
            return res.redirect("/sign-in?error=Access denied: Insufficient permissions");
        }

        req.user = decodedToken;
        next();

    } catch (error) {
        res.clearCookie('token');
        return res.redirect("/sign-in?error=Invalid or expired token");
    }
};

module.exports = authorize;
