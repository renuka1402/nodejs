const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
    const token = req.cookies.token;
    console.log(token);

    if (!token) {
        console.log("2. No token, redirecting to login...");
        return res.redirect('/login');
    }

    try {
        const verify = jwt.verify(token, process.env.JWT_SECRET); 
        req.user = verify; 
        console.log("3. Token Verified. User ID:", req.user.id);
        next();
    } catch (err) {
        console.log("4. Token Error:", err.message);
        res.clearCookie('token');
        res.redirect('/login');
    }
};

module.exports = { requireAuth };