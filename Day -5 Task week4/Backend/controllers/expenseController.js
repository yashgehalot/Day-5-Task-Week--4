const Expense = require('../models/Expense');

// 1. Create Expense
const createExpense = async (req, res) => {
  try {
    const { title, amount, category, description, status, date } = req.body;

    // Basic Validation: Ensure amount is a number and required fields exist
    if (!title || isNaN(amount)) {
      return res.status(400).json({ message: "Please provide a valid title and numeric amount" });
    }

    const expense = new Expense({
      user: req.user.id, // ID from protect middleware
      title,
      amount: Number(amount), // Ensure it is stored as a number
      category,
      description,
      status: status || 'Pending', // Default status if not provided
      date: date || Date.now()
    });

    const savedExpense = await expense.save();
    res.status(201).json(savedExpense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. Get All Expenses (For logged in user)
const getExpenses = async (req, res) => {
  try {
    // Find only expenses belonging to the user attached to req.user by protect middleware
    const expenses = await Expense.find({ user: req.user.id }).sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. Get Single Expense
const getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    
    // Check if expense exists AND belongs to the authenticated user
    if (expense && expense.user.toString() === req.user.id) {
      res.json(expense);
    } else {
      res.status(404).json({ message: "Expense not found or unauthorized" });
    }
  } catch (error) {
    res.status(500).json({ message: "Invalid ID format or server error" });
  }
};

// 4. Update Expense
const updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (expense && expense.user.toString() === req.user.id) {
      // Prevent user from changing the ownership of the expense
      if (req.body.user) delete req.body.user;

      const updatedExpense = await Expense.findByIdAndUpdate(
        req.params.id,
        { $set: req.body }, // Use $set to update only provided fields
        { new: true, runValidators: true } // runValidators ensures schema rules are followed
      );
      res.json(updatedExpense);
    } else {
      res.status(404).json({ message: "Expense not found or unauthorized" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 5. Delete Expense
const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (expense && expense.user.toString() === req.user.id) {
      await expense.deleteOne();
      res.json({ message: "Expense removed successfully", id: req.params.id });
    } else {
      res.status(404).json({ message: "Expense not found or unauthorized" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createExpense, getExpenses, getExpenseById, updateExpense, deleteExpense };