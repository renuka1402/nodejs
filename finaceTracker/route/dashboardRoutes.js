const express = require('express');
const router = express.Router();
const dashboardController = require('../controller/dashboardController');
const auth = require('../middleware/auth'); 


console.log("Auth Middleware Check:", auth.requireAuth);

router.get('/', auth.requireAuth, (req, res) => {
    res.redirect('/dashboard');
});

router.get('/dashboard', auth.requireAuth, dashboardController.showDashboard);

module.exports = router;