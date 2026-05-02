const express = require('express');
const router = express.Router();
const transCtrl = require('../controller/transactionController');
const { requireAuth } = require('../middleware/auth');



router.get('/transaction/add', requireAuth, transCtrl.showAddForm);

router.post('/transaction/add', requireAuth, transCtrl.addTransaction);

module.exports = router;