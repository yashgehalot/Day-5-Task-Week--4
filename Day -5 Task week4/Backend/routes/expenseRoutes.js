const express = require('express');
const router = express.Router();
const { 
  createExpense, 
  getExpenses, 
  getExpenseById, 
  updateExpense, 
  deleteExpense 
} = require('../controllers/expenseController');

// Import your middleware (Assuming you created this on Day 3)
const { protect } = require('../middleware/authMiddleware'); 

// All routes here require the user to be logged in
router.use(protect); 

router.post('/', createExpense);       // Create
router.get('/', getExpenses);          // Read All
router.get('/:id', getExpenseById);    // Read Single
router.put('/:id', updateExpense);     // Update
router.delete('/:id', deleteExpense);  // Delete

module.exports = router;