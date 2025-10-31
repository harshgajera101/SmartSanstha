// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

export const verifyAccessToken = async (req, res, next) => {
  try {
    // Access token from httpOnly cookie or Authorization header
    const token =
      req.cookies?.accessToken ||
      (req.headers.authorization && req.headers.authorization.split(' ')[1]);

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    // Payload contains { id, type } where type is 'admin' or 'user'
    req.user = payload;

    // Optionally fetch full user/admin profile
    if (payload.type === 'user') {
      req.profile = await User.findById(payload.id).select('-password');
    } else if (payload.type === 'admin') {
      req.profile = await Admin.findById(payload.id).select('-password');
    }

    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
