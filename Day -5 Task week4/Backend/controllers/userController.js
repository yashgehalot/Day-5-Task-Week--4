const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Import the model we just created

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    // 1. Deconstruct the data sent from the client (Postman for now)
    const { name, email, password } = req.body;

    // 2. Basic Validation: Are all required fields present?
    if (!name || !email || !password) {
      res.status(400);
      throw new Error('Please add all fields: name, email, and password');
    }

    // 3. Check if a user with this email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error('User already exists with that email');
    }

    // 4. Hash the password (Encrypt it)
    const salt = await bcrypt.genSalt(10); // Generate a "salt"
    const hashedPassword = await bcrypt.hash(password, salt); // Hash the password with the salt

    // 5. Create the user in the database
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // 6. Send a response back to the client
    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        message: "User registered successfully!"
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }

  } catch (error) {
    // Simple error handling for now
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode).json({ message: error.message });
  }
};

// Export the controller function
module.exports = {
  registerUser,
};