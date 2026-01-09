const router = require('express').Router();
const auth = require('../middleware/auth.middleware');
const role = require('../middleware/role.middleware');
const controller = require('../controllers/product.controller');

// Admin only
router.post('/', auth, role('admin'), controller.create);
router.put('/:id', auth, role('admin'), controller.update);
router.delete('/:id', auth, role('admin'), controller.remove);

// Semua user bisa lihat produk
router.get('/', auth, controller.getAll);

module.exports = router;
