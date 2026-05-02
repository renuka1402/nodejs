require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session')
const authRoutes = require('./src/routes/auth');
const postRoutes = require('./src/routes/post');
const app = express();
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
    secret: 'hellosir', 
    resave: false,

    cookie: { 
        secure: false, 
        
    }
}));
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});
app.use('/', authRoutes);
app.use('/', postRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('DB Connected');
        app.listen(process.env.PORT || 3000, () => {
            console.log(`Server running on http://localhost:3000`);
        });
    })
    .catch((err) => {
        console.log('DB Error:', err);
    });