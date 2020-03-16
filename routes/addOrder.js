const {transaction} = require('objection');
const SelfServeOrder = require('../models/selfServeOrder');
const CustomerServiceOrder = require('../models/customerServiceOrder');
const TechnicalOrder = require('../models/technicalOrder');
const WashAndFoldOrder = require('../models/washAndFoldOrder');
const Order = require('../models/order');


async function create(orderType, details) {
    try {
        switch (orderType) {
            case 'Wash & Fold': {
                const trx = await transaction.start(Order.knex());
                const {
                    userId,
                    totalAmount,
                    laundryType,
                    machines,
                    storeId,
                } = details;
                const washAndFoldDetails = await WashAndFoldOrder.query(trx).insert({
                    customerId: userId,
                    totalAmount,
                    laundryType,
                    storeId,
                    lineItems: JSON.stringify(machines),
                });
                await Order.query(trx).insert({
                    orderableId: washAndFoldDetails.id,
                    orderableType: 'WashAndFoldOrder',
                });
                await trx.commit();
                // using order as parent model.
                const orderDetails = await Order.query()
                .eagerAlgorithm(WashAndFoldOrder.JoinEagerAlgorithm)
                .eager({
                    washAndFoldOrders: true,
                });
                const washAndFoldOrdersDetails = await WashAndFoldOrder.query()
                .eagerAlgorithm(WashAndFoldOrder.JoinEagerAlgorithm)
                .eager({
                    orders:true,
                });
                return {orderDetails, washAndFoldOrdersDetails};
            }
            default: return false;
        }

    } catch (error) {
        throw new Error(error);
    }
}
async function createOrder(req, res, next) {
    try {
        const { orderType } = req.body;
        const details = await create(orderType, req.body);
        res.json({
            success: true,
            details,
        });
    } catch (error) {
        next(error);
    }
}

module.exports = createOrder;
