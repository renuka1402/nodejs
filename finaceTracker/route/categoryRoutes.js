const express = require('express');
const router = express.Router();
const categoryController = require('../controller/categoryController');
const { requireAuth } = require('../middleware/auth');

router.get('/categories', requireAuth, categoryController.listCategories);
router.post('/categories', requireAuth, categoryController.createCategory);


module.exports = router;