const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/userController');

// Define the POST route for registration
// This will be mapped to '/api/users/register' in the main server file
router.post('/register', registerUser);

module.exports = router;