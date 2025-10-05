// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { verifyAccessToken } = require('../middleware/authMiddleware');
const { allowRoles } = require('../middleware/roleMiddleware');

// All routes below require a valid access token from a user with the 'admin' type.
router.use(verifyAccessToken, allowRoles('admin'));

// --- User Management Routes ---
router.get('/users', adminController.getAllUsers);
router.get('/users/:id', adminController.getUserById);
router.post('/users', adminController.createUserAsAdmin);
router.put('/users/:id', adminController.updateUserByAdmin);
router.delete('/users/:id', adminController.deleteUserByAdmin);


// --- Admin Management Routes ---
// The superadmin check has been removed. Any admin can now access these endpoints.
router.get('/admins', adminController.getAllAdmins);
router.put('/admins/:id', adminController.updateAdmin);
router.delete('/admins/:id', adminController.deleteAdmin);


module.exports = router;