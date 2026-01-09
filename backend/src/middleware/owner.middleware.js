module.exports = (req, res, next) => {
  if (req.user.id !== parseInt(req.params.id)) {
    return res.status(403).json({ message: 'Not your account' });
  }
  next();
};
