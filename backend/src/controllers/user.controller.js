// user.controller.js
const { User, Role } = require('../models');
const bcrypt = require('bcryptjs');

exports.getAll = async (req, res) => {
  const users = await User.findAll({
    include: { model: Role, attributes: ['name'] }
  });
  res.json(users);
};

exports.getProfile = async (req, res) => {
  const user = await User.findByPk(req.user.id, {
    attributes: ['id', 'name', 'email', 'role_id']
  });
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};

exports.updateProfile = async (req, res) => {
  await User.update(req.body, { where: { id: req.user.id } });
  res.json({ message: 'Profile updated' });
};

exports.updatePassword = async (req, res) => {
  const hashed = await bcrypt.hash(req.body.password, 10);
  await User.update({ password: hashed }, { where: { id: req.user.id } });
  res.json({ message: 'Password updated' });
};
