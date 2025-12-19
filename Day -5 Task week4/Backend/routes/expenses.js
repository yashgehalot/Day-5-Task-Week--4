const express = require('express');
const router = express.Router();

// 1. Import Middleware (Ensures user is authenticated)
const { protect } = require('../middleware/authMiddleware');

// 2. Import Controllers (Ensure these functions are exported in expenseController.js)
const { 
    createExpense, 
    getExpenses, 
    getExpenseById, 
    updateExpense, 
    deleteExpense 
} = require('../controllers/expenseController');

// 3. Apply Protection (Requirement: Secure your CRUD operations)
router.use(protect);

// 4. CRUD Routes
// [POST] Create a new expense - http://localhost:3000/api/expenses
router.post('/', createExpense);      

// [GET] Read all expenses - http://localhost:3000/api/expenses
router.get('/', getExpenses);         

// [GET] Read a single expense - http://localhost:3000/api/expenses/:id
router.get('/:id', getExpenseById);   

// [PUT] Update an expense - http://localhost:3000/api/expenses/:id
router.put('/:id', updateExpense);    

// [DELETE] Delete an expense - http://localhost:3000/api/expenses/:id
router.delete('/:id', deleteExpense); 

module.exports = router;