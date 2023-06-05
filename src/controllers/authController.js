const User = require("../models/user");
const ErrorHandler = require("../utils/ErrorHandler");
const bcrypt = require("bcryptjs");
const sendToken = require("../utils/jwtToken");

exports.authentication = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const { token } = req.cookies;

        if (token) {
            return next(new ErrorHandler("Please clear your cookie to logout"));
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
