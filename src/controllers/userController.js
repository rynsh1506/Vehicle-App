const User = require("../models/user");
const ErrorHandler = require("../utils/ErrorHandler");
const bcrypt = require("bcryptjs");
const sendToken = require("../utils/jwtToken");
const models = require("../models/index");
const { Op } = require("sequelize");

// Retrieve all users
exports.getAllUsers = async (req, res, next) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;

        // Menghitung total jumlah data
        const totalCount = await User.count();

        // Query data dengan limit dan skip
        const users = await User.findAll({
            limit: parseInt(limit),
            offset: parseInt(skip),
        });

        // Menghapus properti password dari setiap objek dalam array users
        const sanitizedUsers = users.map((user) => {
            const { dataValues } = user;
            delete dataValues.password;
            return dataValues;
        });

        // Mengembalikan response API dengan metadata
        res.json({
            total: totalCount,
            limit: parseInt(limit),
            skip: parseInt(skip),
            data: sanitizedUsers,
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve users" });
    }
};

// Retrieve user by username
exports.getUserByUsername = async (req, res, next) => {
    try {
        const username = req.params.username;
        const user = await User.findOne({ where: { username } });

        if (!user) {
            return next(new ErrorHandler("User not found", 404));
        }

        const { dataValues } = user;
        delete dataValues.password;

        res.status(200).json({ dataValues });
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve user" });
    }
};

// Create a new user
exports.createUser = async (req, res, next) => {
    try {
        const { email, username, password, isAdmin } = req.body;
        const regex = /^[a-zA-Z0-9_]{4,}$/;
        const user = await User.findOne({
            where: { email, username },
        });

        if (!regex.test(username)) {
            return next(new ErrorHandler("Invalid username format", 400));
        }

        if (user) {
            return next(new ErrorHandler("User and Email already exists", 400));
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            email,
            username,
            password: hashPassword,
            isAdmin,
        });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: "Failed to create user" });
    }
};

// Update user by Username
exports.updateUser = async (req, res, next) => {
    try {
        const usernameParam = req.params.username;
        const currentEmail = req.user.email;
        const { email, username, password, isAdmin } = req.body;

        const currentUser = await User.findOne({
            where: { email: currentEmail },
        });

        if (!currentUser) {
            return next(new ErrorHandler("User not found", 404));
        }

        // Cek user isAdmin/user itu sendiri yang sedang login
        if (!currentUser.isAdmin && usernameParam !== currentUser.username) {
            return next(
                new ErrorHandler(
                    "Access denied. Only admins or the user themselves can perform this action.",
                    403
                )
            );
        }

        // Cek apakah email atau username sudah ada dalam database (kecuali untuk pengguna saat ini)
        const existingUser = await User.findOne({
            where: {
                [Op.and]: [
                    { email: { [Op.ne]: currentEmail } },
                    { [Op.or]: [{ email }, { username }] },
                ],
            },
        });

        if (existingUser) {
            return next(
                new ErrorHandler("Email or Username is already in use", 400)
            );
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const updateFields = {
            email,
            username,
            password: hashPassword,
        };

        // Hanya jika currentUser adalah admin, izinkan perubahan kolom isAdmin
        if (currentUser.isAdmin) {
            updateFields.isAdmin = isAdmin;
        } else {
            return next(
                new ErrorHandler(
                    "Access denied. Only admins have access to this feature.",
                    403
                )
            );
        }

        await User.update(updateFields, {
            where: { id: currentUser.id },
        });

        const updatedUser = await User.findOne({
            where: { username },
        });

        if (!updatedUser) {
            return next(new ErrorHandler("Failed to update user", 500));
        }

        sendToken(updatedUser, 200, res);
    } catch (error) {
        res.status(500).json({ error: "Failed to update user" });
    }
};

// Delete user by ID
exports.deleteUser = async (req, res, next) => {
    const username = req.params.username;
    const { email } = req.user;

    try {
        const currentUser = await User.findOne({ where: { email } });

        if (!currentUser) {
            return next(new ErrorHandler("User not found", 404));
        }

        if (!currentUser.isAdmin && username !== currentUser.username) {
            return next(new ErrorHandler("Unauthorized access", 401));
        }

        const result = await User.destroy({ where: { id: currentUser.id } });

        if (!result) {
            return next(new ErrorHandler("User not found", 404));
        }

        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete user" });
    }
};
