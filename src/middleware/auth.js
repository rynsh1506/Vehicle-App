const User = require("../models/user");
const ErrorHandler = require("../utils/ErrorHandler");
const jwt = require("jsonwebtoken");

exports.isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return next(new ErrorHandler("Please login to continue", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY);

    req.user = await User.findOne({ where: { email: decoded.email } });

    next();
};

exports.isAdmin = async (req, res, next) => {
    try {
        const { email } = req.user;
        // Cari pengguna berdasarkan email
        const user = await User.findOne({ where: { email } });
        if (!user || !user.isAdmin) {
            return next(new ErrorHandler("Unauthorized access", 401));
        }
        next();
    } catch (error) {
        res.status(500).json({ error: "Failed to validate admin access" });
    }
};
