const Transaction = require('../models/Transaction');
const Category = require('../models/Category');
exports.showAddForm = async (req, res) => {
    try {
        const categories = await Category.find({ user: req.user.id, isDeleted: false });
        res.render('transactions', { categories, error: null });
    } catch (err) {
        res.redirect('/dashboard');
    }
};
exports.addTransaction = async (req, res) => {
    try {
        const { amount, category, type, date, notes } = req.body;
        await Transaction.create({
            amount,
            category,
            type,
            date: date || Date.now(),
            notes,
            user: req.user.id
        });

        req.flash('success', 'Transaction added!');
        res.redirect('/dashboard');

    } catch (err) {
        
        res.render('transactions', { 
            categories, 
            error: "Please fill all fields correctly." 
        });
    }
};