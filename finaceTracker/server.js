require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash'); 
const path = require('path');
const authRoutes = require('./route/authRoutes');
const dashboardRoutes = require('./route/dashboardRoutes');
const categoryRoutes = require('./route/categoryRoutes');
const transactionRoutes = require('./route/transactionRoutes');
const { requireAuth } = require('./middleware/auth');

const app = express();
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret:'finance-tracker-secret',
    resave: false,
    saveUninitialized: false
}));
app.use(flash()); 
app.use((req, res, next) => {
    res.locals.flash = {
        error: req.flash('error'),
        success: req.flash('success')
    };
    next();
});
app.use(authRoutes);
// app.use(requireAuth);
app.use(dashboardRoutes);
app.use(categoryRoutes);
app.use(transactionRoutes);
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error('MONGO_URI is missing in .env file');
    process.exit(1);
}
mongoose.connect(MONGO_URI)
    .then(() => {
        app.listen(PORT, () => console.log(`Server: http://localhost:${PORT}`));
    })
    .catch(err => {
        console.error('Database connection failed', err.message);
    });
