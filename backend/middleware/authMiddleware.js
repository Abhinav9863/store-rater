// backend/middleware/authMiddleware.js

const jwt = require('jsonwebtoken');

// Middleware to verify the token for any protected route
exports.protect = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
        try {
            // Get token from header (e.g., "Bearer TOKEN_STRING")
            const token = authHeader.split(' ')[1];

            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Attach the user's info to the request object
            req.user = decoded.user;
            next(); // Proceed to the next function
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

// Middleware to check if the user is an admin
exports.isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'System Administrator') {
        next(); // User is an admin, proceed
    } else {
        res.status(403).json({ message: 'Not authorized as an admin' });
    }
};