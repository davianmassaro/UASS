const router = require('express').Router();
const auth = require('../middleware/auth.middleware');
const role = require('../middleware/role.middleware');
const controller = require('../controllers/user.controller');

// Semua user bisa lihat profile dan update profile/password sendiri
router.get('/profile', auth, controller.getProfile);
router.put('/profile', auth, controller.updateProfile);
router.put('/password', auth, controller.updatePassword);

// Admin bisa lihat semua user
router.get('/', auth, role('admin'), controller.getAll);

module.exports = router;
