const Model = require('./index');

class SelfServeOrder extends Model {
    static get tableName() {
        return 'selfServeOrders';
    }
    static get relationMappings() {
        const Order = require('./order');
        return { 
            orders: {
                relation: Model.HasManyRelation,
                modelClass: Order,

                filter(builder) {
                    builder.where('orderableType', 'SelfServeOrder');
                },

                beforeInsert(model) {
                    model.orderableType = 'SelfServeOrder';
                },

                join: {
                    from: `${this.tableName}.id`,
                    to: `${Order.tableName}.orderableId`,
                },
            },
        };
    }
}

module.exports = SelfServeOrder;
