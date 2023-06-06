const express = require("express");
const authControllers = require("../controllers/authController");
const { isAuthenticated } = require("../middleware/auth");
const router = express.Router();

router.post("/login", authControllers.authentication);
router.get("/logout", isAuthenticated, authControllers.logout);

module.exports = router;
