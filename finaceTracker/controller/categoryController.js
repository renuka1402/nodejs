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

        if (!name || !name.trim()) {
            const categories = await Category.find({ user: req.user.id, isDeleted: false });
            return res.render('categories', {
              
                categories,
                error: 'Name is required!'
            });
        }

        await new Category({
            name: name.trim(),
            user: req.user.id,
            isDeleted: false
        }).save();

        res.redirect('/categories');
    } catch (err) {
        res.redirect('/categories');
    }
};

