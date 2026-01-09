module.exports = (roleName) => {
  return (req, res, next) => {
    // Role bisa berupa angka (role_id)
    const roleMap = { admin: 1, staff: 2 }; 
    const requiredRole = roleMap[roleName.toLowerCase()];

    if (req.user.role !== requiredRole) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
};
