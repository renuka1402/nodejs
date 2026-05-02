const express = require("express");
const router = express.Router();
const auth = require("../controller/authController");



router.get("/register", auth.registerPage);
router.post("/register", auth.register);

router.get("/login", auth.loginPage);
router.post("/login", auth.login);

router.get("/logout", auth.logoutConfirm);
router.post("/logout", auth.logout);

module.exports = router;
