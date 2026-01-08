const router = require('express').Router();
const auth = require('../middlewares/auth.middleware');
const role = require('../middlewares/role.middleware');
const controller = require('../controllers/product.controller');

router.post('/', auth, role(['admin']), controller.create);
router.get('/', auth, controller.getAll);

module.exports = router;
