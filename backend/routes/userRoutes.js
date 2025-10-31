// routes/userRoutes.js
import express from 'express';
import * as userController from '../controllers/userController.js';
import { verifyAccessToken } from '../middleware/authMiddleware.js';
import { allowRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

// All routes below require a valid access token from a user
router.use(verifyAccessToken, allowRoles('user'));

router.get('/me', userController.getProfile);
router.put('/me', userController.updateProfile);
router.delete('/me', userController.deleteAccount);

export default router;
