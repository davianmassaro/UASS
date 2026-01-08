const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Role = require('../models/role');

exports.signup = async (req, res) => {
  const { name, email, password, secret } = req.body;

  let roleName;
  if (secret === 'ADMIN_SECRET_KEY') roleName = 'admin';
  else if (secret === 'STAFF_SECRET_KEY') roleName = 'staff';
  else return res.status(403).json({ message: 'Invalid secret' });

  const role = await Role.findOne({ where: { name: roleName } });
  const hash = await bcrypt.hash(password, 10);

  await User.create({
    name,
    email,
    password: hash,
    role_id: role.id
  });

  res.status(201).json({ message: 'User created' });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: { email },
    include: Role
  });

  if (!user) return res.status(404).json({ message: 'User not found' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: 'Wrong password' });

  const token = jwt.sign(
    { id: user.id, role: user.Role.name },
    process.env.JWT_SECRET
  );

  res.json({ token });
};
