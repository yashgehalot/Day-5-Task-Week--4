const express = require('express');
const cors = require('cors'); 
const dotenv = require('dotenv').config();
const connectDB = require('./Config/db'); 

// Force port 5000 so it doesn't conflict with React (which runs on 3000)
const port = process.env.PORT || 3000; 

connectDB(); 

const app = express();

// --- MIDDLEWARE ---
app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// --- EXISTING ROUTES ---
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/auth', require('./routes/auth')); 
app.use('/api/expenses', require('./routes/expenses'));

// --- DAY 1 TEST ROUTE ---
app.get('/api/day1', (req, res) => {
    res.json({ message: "Backend Working!" });
});

// ============================================
// --- DAY 2 TASK: POST ENDPOINT (ADD THIS) ---
// ============================================
app.post('/api/day2-test', (req, res) => {
    const receivedData = req.body;

    console.log("Day 2 POST Request Received:", receivedData);

    res.status(201).json({
        message: "Data received successfully!",
        data: receivedData
    });
});
// ============================================

// --- START SERVER ---
app.listen(port, () => console.log(`Server started on port ${port}`));