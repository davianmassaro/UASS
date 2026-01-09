const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Mapping role string ke ID di tabel roles
const roleMap = { admin: 1, staff: 2 };

// Kata kunci untuk signup
const secretKeywords = { admin: 'ADMIN_SECRET', staff: 'STAFF_SECRET' };

exports.signup = async (req, res) => {
  try {
    const { name, email, password, role, keyword } = req.body;

    if (!name || !email || !password || !role || !keyword) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Validasi kata kunci sesuai role
    if (secretKeywords[role.toLowerCase()] !== keyword) {
      return res.status(403).json({ message: 'Invalid signup keyword for this role' });
    }

    // Cek email sudah terdaftar
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: 'Email already exists' });

    const hashed = await bcrypt.hash(password, 10);

    // Ambil role_id dari mapping
    const role_id = roleMap[role.toLowerCase()];
    if (!role_id) return res.status(400).json({ message: 'Invalid role' });

    const user = await User.create({
      name,
      email,
      password: hashed,
      role_id
    });

    res.status(201).json({ message: 'User created', user_id: user.id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid email or password' });

    // Token berisi id dan role_id
    const token = jwt.sign(
      { id: user.id, role: user.role_id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
