const User = require("../models/user");
const ErrorHandler = require("../utils/ErrorHandler");
const bcrypt = require("bcryptjs");
const sendToken = require("../utils/jwtToken");
const models = require("../models/index");

exports.authentication = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const { token } = req.cookies;

        if (token) {
            return next(new ErrorHandler("You are currently logged in", 400));
        }

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return next(new ErrorHandler("User not found", 400));
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return next(new ErrorHandler("Password invalid", 401));
        }

        sendToken(user, 200, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.logout = async (req, res, next) => {
    try {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        });

        res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
