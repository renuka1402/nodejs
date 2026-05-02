const express = require("express");
const post = require("../controller/postController");

const path = require("path");

const upload = require("../middlewre/multer");
const isAuth = require("../middlewre/authmiddleware"); 

const router = express.Router();





router.get("/", isAuth, post.home);

router.get("/create", isAuth, post.createPostPage);
router.post("/create", isAuth, upload.single('image'), post.createPost);


router.get("/post/:id", isAuth, post.getSinglePost);

// Edit Post
router.get("/edit/:id", isAuth, post.editPostPage);
router.post("/edit/:id", isAuth, upload.single('image'),  post.updatePost);





module.exports = router;