const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const path = require("path");

const authRoutes = require("./src/routes/auth"); 
const postRoutes = require("./src/routes/post");

const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));

app.use(session({
  secret: "blog-secret-key",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 } 
}));


app.use((req, res, next) => {
  res.locals.user = req.session.user || null; 
  next();
});


app.use("/", authRoutes);
app.use("/", postRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/blogdb")
  .then(() => app.listen(3000, () => console.log(" http://localhost:3000")))
  .catch(err => console.log(err));