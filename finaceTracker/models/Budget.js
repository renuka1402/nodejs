const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
   
    name: { type: String, required: true }, 
category: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Category', 
        required: true 
    },
    categoryName: { type: String },
    amount: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    month: { type: Number, default: new Date().getMonth() }, 
    year: { type: Number, default: new Date().getFullYear() },
    timeframe: { type: String, default: 'monthly' }
});


module.exports = mongoose.model('Budget', budgetSchema);