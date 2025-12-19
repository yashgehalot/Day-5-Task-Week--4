const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    // 1. Get token from header
    const token = req.header('x-auth-token');

    // 2. Check if no token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // 3. Verify token
    try {
        const decoded = jwt.verify(token, "mysecrettoken"); // Same secret as login
        req.user = decoded.user; // Attach the user ID to the request
        next(); // Move to the next function
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};