const express = require("express");
const router = express.Router();
const { signup, signin } = require("../controllers/authController");

// Signup route
router.post("/register", signup);
router.post("/login", signin);

module.exports = router;