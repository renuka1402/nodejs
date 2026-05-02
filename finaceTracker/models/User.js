const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
 name: { type: String, required: true },
  username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String },
    dateOfBirth: { type: Date, default: null },
    phone: { type: String, trim: true, default: '' },
    address: { type: String, trim: true, default: '' }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);

