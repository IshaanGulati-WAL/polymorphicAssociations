const router = require('express').Router();

const createOrder = require('./addOrder');
const getOrders = require('./getWashAndFold');

router.post('/', createOrder);
router.get('/', getOrders);

module.exports = exports = router;