
const allowRoles = (...allowedTypes) => {
  return (req, res, next) => {
    // req.user.type provided by authMiddleware
    if (!req.user || !allowedTypes.includes(req.user.type)) {
      return res.status(403).json({ message: 'Forbidden: insufficient privileges' });
    }
    next();
  };
};

module.exports = { allowRoles };
