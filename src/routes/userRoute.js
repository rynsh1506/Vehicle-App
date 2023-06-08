const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { isAuthenticated } = require("../middleware/auth");

// Retrieve all users
router.get("/", isAuthenticated, userController.getAllUsers);

// Retrieve user by username
router.get("/:username", isAuthenticated, userController.getUserByUsername);

// Create a new user
router.post("/", userController.createUser);

// Update user by ID
router.patch("/:username", isAuthenticated, userController.updateUser);

// Delete user by ID
router.delete("/:username", isAuthenticated, userController.deleteUser);

module.exports = router;
