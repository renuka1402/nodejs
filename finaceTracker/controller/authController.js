const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { validateRegisterData, validateLoginData, formatError } = require('../utils/validation');
exports.register = async (req, res) => {
    try {
        const { error, value } = validateRegisterData(req.body);
        if (error) {
            req.flash('error', formatError(error));
            return res.redirect('/register');
        }

      

        const emailExists = await User.findOne({ email: value.email });
        if (emailExists) {
            req.flash('error', 'Email already in use.');
            return res.redirect('/register');
        }

      
        const hashedPassword = await bcrypt.hash(value.password, 10);
        await User.create({
            name: value.fullName,
            username: value.username || '',
            email: value.email,
            password: hashedPassword,
            dateOfBirth: value.dateOfBirth || null,
            phone: value.phone || '',
            address: value.address || ''
        });

        req.flash('success', 'Account created! Please login.');
        res.redirect('/login');

    } catch (err) {
        console.error('Registration failed:', err.message);
        req.flash('error', 'Registration failed.');
        res.redirect('/register');
    }
};


exports.login = async (req, res) => {
    try {
        const { error, value } = validateLoginData(req.body);
        if (error) {
            req.flash('error', formatError(error));
            return res.redirect('/login');
        }

        const user = await User.findOne({ email: value.email });
        if (!user) {
            req.flash('error', 'User not found.');
            return res.redirect('/login');
        }

      
        const isMatch = await bcrypt.compare(value.password, user.password);
        if (!isMatch) {
            req.flash('error', 'Wrong password.');
            return res.redirect('/login');
        }

       
        const token = jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET);
        res.cookie('token', token);
        console.log(token);
        
        
        req.flash('success', 'Welcome back!');
        console.log(1223);
        
        res.redirect('/dashboard');

    } catch (err) {
        req.flash('error', 'Login error.');
        res.redirect('/login');
        console.log(err);
        
    }
};


exports.logout = (req, res) => {
    res.clearCookie('token');
    req.flash('success', 'Logged out.');
    res.redirect('/login');
};
