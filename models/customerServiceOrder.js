const Model = require('./index');

class CustomerServiceOrder extends Model {
    static get tableName() {
        return 'customerServiceOrders';
    }
    static get relationMappings() {
        const Order = require('./order');
        return { 
            orders: {
                relation: Model.HasManyRelation,
                modelClass: Order,

                filter(builder) {
                    builder.where('orderableType', 'customerServiceOrders');
                },

                beforeInsert(model) {
                    model.orderableType = 'customerServiceOrders';
                },

                join: {
                    from: `${this.tableName}.id`,
                    to: `${Order.tableName}.orderableId`,
                },
            },
        };
    }
}

module.exports = CustomerServiceOrder;
