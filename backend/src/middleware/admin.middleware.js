module.exports = (req, res, next) => {
  if (req.user.Role.name !== 'admin') {
    return res.status(403).json({
      message: 'Access denied: admin only'
    });
  }
  next();
};
