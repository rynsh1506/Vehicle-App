const User = require("../models/user");
const ErrorHandler = require("../utils/ErrorHandler");
const bcrypt = require("bcryptjs");
const sendToken = require("../utils/jwtToken");
const models = require("../models");

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

// Retrieve user by ID
exports.getUserById = async (req, res, next) => {
    const userId = req.params.id;

    try {
        const user = await User.findByPk(userId);

        if (!user) {
            return next(new ErrorHandler("User not found", 404));
        }

        const { dataValues } = user;
        delete dataValues.password;

        res.json(dataValues);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve user" });
    }
};

// Create a new user
exports.createUser = async (req, res, next) => {
    const { email, password, isAdmin } = req.body;

    try {
        const user = await User.findOne({
            where: { email },
        });

        if (user) {
            return next(new ErrorHandler("User already exists", 400));
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            email,
            password: hashPassword,
            isAdmin,
        });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: "Failed to create user" });
    }
};

// Update user by ID
exports.updateUser = async (req, res, next) => {
    const userId = parseInt(req.params.id);
    const currenEmail = req.user.email;
    const { email, password, isAdmin } = req.body;

    try {
        const currentUser = await User.findOne({
            where: { email: currenEmail },
        });

        if (!currentUser) {
            return next(new ErrorHandler("User not found", 404));
        }

        // cek user isAdmin/user itu sendiri yang sedang login
        if (!currentUser.isAdmin && userId !== currentUser.id) {
            return next(
                new ErrorHandler(
                    "Access denied. Only admins or the user themselves can perform this action.",
                    403
                )
            );
        }

        // Cek apa email sudah ada yang pakai
        const existingUser = await User.findOne({
            where: { email },
        });

        if (existingUser && existingUser.id !== userId) {
            return next(new ErrorHandler("Email is already in use", 400));
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const updateFields = {
            email,
            password: hashPassword,
        };

        // Hanya jika currentUser adalah admin, izinkan perubahan kolom isAdmin
        if (!currentUser.isAdmin) {
            return next(
                new ErrorHandler(
                    "Access denied. Only admins have access to this feature.",
                    403
                )
            );
        } else {
            updateFields.isAdmin = isAdmin;
        }

        await User.update(updateFields, {
            where: { id: userId },
        });

        const updatedUser = await User.findOne({
            where: { id: userId },
        });

        sendToken(updatedUser, 200, res);
    } catch (error) {
        res.status(500).json({ error: "Failed to update user" });
    }
};

// Delete user by ID
exports.deleteUser = async (req, res, next) => {
    const userId = parseInt(req.params.id);
    const { email } = req.user;

    try {
        const currentUser = await User.findOne({ where: { email } });

        if (!currentUser) {
            return next(new ErrorHandler("User not found", 404));
        }

        if (!currentUser.isAdmin && userId !== currentUser.id) {
            return next(new ErrorHandler("Unauthorized access", 401));
        }

        const result = await User.destroy({ where: { id: userId } });

        if (!result) {
            return next(new ErrorHandler("User not found", 404));
        }

        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete user" });
    }
};
