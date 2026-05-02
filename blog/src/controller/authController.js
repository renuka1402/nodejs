const User = require("../models/user");

exports.registerPage = (req, res) => res.render("register");

exports.register = async (req, res) => {
  try {
    await User.create(req.body);
    res.redirect("/login");
  } catch (err) {
    res.send("Registration failed: " + err.message);
  }
};
exports.loginPage = (req, res) => res.render("login");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });

  if (!user) {
    return res.send("Invalid Email ");
  }
  req.session.user = {
    id: user._id,
    email: user.email
  };

  res.redirect("/");
};


exports.logoutConfirm = (req, res) => {
  res.render("logout");
};


exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect("/");
    }
   
    res.redirect("/login");
  });
};
