const jwt = require('jsonwebtoken');
const User = require('../models/User');

// ⬇️ THIS WAS MISSING: Make sure we use the same key as auth.js
const JWT_SECRET = process.env.JWT_SECRET || "Harryisagoodb$oy"; 

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token using the CORRECT Secret Key
      const decoded = jwt.verify(token, JWT_SECRET);

      // Get user from the token
      req.user = await User.findById(decoded.user.id).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };