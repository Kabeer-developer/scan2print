// authRoutes.js
const express = require("express");
const { registerUser, loginUser, getMe } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

// Register store owner
router.post("/register", registerUser);

// Login store owner
router.post("/login", loginUser);

// Get logged-in user info
router.get("/me", protect, getMe);

module.exports = router;
