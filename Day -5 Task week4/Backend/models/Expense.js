const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    // Link to the user (Crucial for "Link each resource to logged-in user")
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // IMPORTANT: This must match the name you gave your User model (usually 'User' or 'users')
        required: true
    },
    // The "Title" required by the image
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true
    },
    // The "Amount"
    amount: {
        type: Number,
        required: [true, 'Please add a positive number']
    },
    // The "Category"
    category: {
        type: String,
        required: [true, 'Please select a category'], 
        // You can restrict categories using enum if you want:
        // enum: ['Food', 'Transport', 'Salary', 'Entertainment', 'Health']
    },
    // The "Description"
    description: {
        type: String,
        required: false
    },
    // The "Status" required by the image
    status: { 
        type: String, 
        default: "Completed" // Example: "Pending", "Completed"
    },
    // The "Date" (optional, but good for tracking)
    date: {
        type: Date,
        default: Date.now
    }
}, { 
    timestamps: true // This automatically adds 'createdAt' and 'updatedAt'
});

module.exports = mongoose.model('Expense', ExpenseSchema);