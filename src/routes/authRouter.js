const express = require("express");
const authControllers = require("../controllers/authController");
const router = express.Router();

router.post("/", authControllers.authentication);

module.exports = router;
