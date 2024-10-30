const jwt = require('jsonwebtoken');

const authorize = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            // console.log('No token found');
            res.redirect("/fleet/sign-in");
            return res.status(401).json({ message: 'Authorization token is missing' });
        }

        // Log the JWT secret for debugging purposes
        // console.log('JWT Secret in middleware:', process.env.SECRET);

        // Verify the token using the secret
        const decodedToken = jwt.verify(token, process.env.SECRET); // Use the secret from your .env file
        // console.log('Decoded token:', decodedToken);

        if (decodedToken.userType !== 'fleet') {
            // console.log('Access denied due to insufficient permissions');
            res.redirect("/sign-in");
            return res.status(403).json({ message: 'Access denied: Insufficient permissions' });
        }

        req.user = decodedToken; // Pass the decoded token to the request object
        next(); // Proceed to the next middleware or route handler

    } catch (error) {
        // console.log('Invalid or expired token:', error.message);
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};


module.exports = authorize;