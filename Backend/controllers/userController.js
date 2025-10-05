// controllers/userController.js
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const getCategoryFromDOB = require('../utils/categorize');

exports.getProfile = async (req, res) => {
  // req.profile loaded by authMiddleware
  if (!req.profile) return res.status(404).json({ message: 'Profile not found' });
  return res.json({ profile: req.profile });
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const updates = {};
    const { name, dob, password } = req.body;

    if (name) updates.name = name;
    if (dob) {
      updates.dob = dob;
      // Use the imported utility to recalculate category if dob changes
      updates.category = getCategoryFromDOB(dob);
    }
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(password, salt);
    }

    const user = await User.findByIdAndUpdate(userId, updates, { new: true }).select('-password');
    return res.json({ message: 'Profile updated', user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;
    await User.findByIdAndDelete(userId);
    // clear cookies
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    return res.json({ message: 'Account deleted' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};