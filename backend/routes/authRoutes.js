// backend/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');

// Define the signup route: POST /api/auth/signup
router.post('/signup', signup);

// Define the login route: POST /api/auth/login
router.post('/login', login);

module.exports = router;