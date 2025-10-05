// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const User = require('../models/User');
require('dotenv').config({ path: '.env.development.local' });

const verifyAccessToken = async (req, res, next) => {
  try {
    // access token from httpOnly cookie or Authorization header
    const token = req.cookies?.accessToken || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
    if (!token) return res.status(401).json({ message: 'No token provided' });

    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    // payload will contain { id, type } where type is 'admin' or 'user'
    req.user = payload;

    // optionally fetch full user/admin object
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

module.exports = { verifyAccessToken };
