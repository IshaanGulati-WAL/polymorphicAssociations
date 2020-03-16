const { transaction } = require('objection');
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
            }
                break;
            default: throw ('Enter valid wash service.');
        }

    } catch (error) {
        throw (error);
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
