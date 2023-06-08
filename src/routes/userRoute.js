const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { isAuthenticated } = require("../middleware/auth");

// Retrieve all users
router.get("/", isAuthenticated, userController.getAllUsers);

// Retrieve user by ID
router.get("/:username", isAuthenticated, userController.getUserById);

// Create a new user
router.post("/", userController.createUser);

// Update user by ID
router.patch("/:username", isAuthenticated, userController.updateUser);

// Delete user by ID
router.delete("/:username", isAuthenticated, userController.deleteUser);

module.exports = router;
