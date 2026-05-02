const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true, trim: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    dueDate: { type: Date, required: true },
    frequency: { type: String, enum: ['once', 'monthly', 'quarterly', 'yearly'], default: 'monthly' },
    notificationMethod: { type: String, enum: ['email', 'push', 'dashboard'], default: 'dashboard' },
    notes: { type: String, trim: true, maxlength: 500 }
}, {
    timestamps: true
});

module.exports = mongoose.model('Reminder', reminderSchema);
