const router = require('express').Router();
const auth = require('../middlewares/auth.middleware');
const controller = require('../controllers/transaction.controller');

router.post('/', auth, controller.create);

module.exports = router;
