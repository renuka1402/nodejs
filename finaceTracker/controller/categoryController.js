const Category = require('../models/Category');

exports.listCategories = async (req, res) => {
    try {
        const categories = await Category.find({ user: req.user.id, isDeleted: false });

        res.render('categories', {
            categories,
            error: null
        });
    } catch (err) {
        res.render('categories', {
        
            categories: [],
            error: err.message
        });
    }
};

exports.createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const userId = req.user.id;

        if (!name || !name.trim()) {
            req.flash('error', 'Name is required!');
            return res.redirect('/categories');
        }

        await Category.create({
            name: name.trim(),
            user: userId,
            isDeleted: false
        });

        res.redirect('/categories');
    } catch (err) {
        res.redirect('/categories');
    }
};
