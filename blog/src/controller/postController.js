const Post = require("../models/post");

exports.home = async (req, res) => {
    let page = req.query.page || 1;
    let limit = 5;
    let search = req.query.search || ""; 

    try {
     
        let filter = {};
        if (search) {
            filter.title = { $regex: search, $options: "i" };
        }

        const posts = await Post.find(filter)
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ createdAt: -1 });

        const total = await Post.countDocuments(filter);
        const totalPage = Math.ceil(total / limit);

        
        res.render("index", { 
            posts, 
            totalPage, 
            currentPage: page, 
            search 
        });
    } catch (err) {
        res.send("Error: " + err.message);
    }
};

exports.createPostPage = (req, res) => {
    res.render("create");
};

exports.createPost = async (req, res) => {
    try {
        const { title, content, category } = req.body;
        const imagePath = req.file.filename

        await Post.create({
            title,
            content,
            category,
            author: req.session.user.email,
            image: imagePath
        });
        res.redirect("/");
    } catch (err) {
        res.send(err.message);
        console.log(err.message);
        
    }
};


exports.getSinglePost = async (req, res) => {
    const post = await Post.findById(req.params.id);
    res.render("post", { post });
};

exports.editPostPage = async (req, res) => {
    const post = await Post.findById(req.params.id);
    res.render("edit", { post });
};

exports.updatePost = async (req, res) => {
    try {
        await Post.findByIdAndUpdate(req.params.id, req.body);
        res.redirect("/"); 
    } catch (err) {
        res.send("Update failed");
    }
};



