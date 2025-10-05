// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyAccessToken } = require('../middleware/authMiddleware');

// User routes
router.post('/register', authController.registerUser); // create user
router.post('/login', authController.loginUser);
router.post('/logout', authController.logout);
router.post('/refresh', authController.refreshToken);

// Admin routes
router.post('/admin/create', authController.createAdmin); // protected via master key in body
router.post('/admin/login', authController.loginAdmin);

module.exports = router;
