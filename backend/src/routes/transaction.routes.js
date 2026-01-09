const router = require('express').Router();
const auth = require('../middleware/auth.middleware');
const role = require('../middleware/role.middleware');
const controller = require('../controllers/transaction.controller');

// Semua user bisa lihat transaksi dan tambah transaksi
router.get('/', auth, controller.getAll);
router.post('/', auth, controller.create);

// Hanya admin yang bisa hapus transaksi
router.delete('/:id', auth, role('admin'), controller.remove);

module.exports = router;
