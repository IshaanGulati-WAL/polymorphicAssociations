const WashAndFoldOrder = require('../models/washAndFoldOrder');
const Order = require('../models/order');

async function getOrders(req, res, next) {
    try {
        const orderDetails = await Order.query()
            .eagerAlgorithm(WashAndFoldOrder.JoinEagerAlgorithm)
            .eager({
                washAndFoldOrders: true,
            });
        const washAndFoldOrdersDetails = await WashAndFoldOrder.query()
            .eagerAlgorithm(WashAndFoldOrder.JoinEagerAlgorithm)
            .eager({
                orders: true,
            });
        res.status(200).json({
            success: true,
            orders: orderDetails,
            washAndFoldOrders: washAndFoldOrdersDetails,
        })    
    } catch (error) {
        next(error);
    }
}

module.exports = exports = getOrders;
