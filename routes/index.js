const router = require('express').Router();

const createOrder = require('./addOrder');
router.post('/', createOrder);

module.exports = exports = router;