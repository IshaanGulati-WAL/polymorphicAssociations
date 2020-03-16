const Model = require('./index');

class TechnicalOrder extends Model {
    static get tableName() {
        return 'technicalOrders';
    }
    static get relationMappings() {
        const Order = require('./order');
        return { 
            orders: {
                relation: Model.HasManyRelation,
                modelClass: Order,

                filter(builder) {
                    builder.where('orderableType', 'TechnicalOrder');
                },

                beforeInsert(model) {
                    model.orderableType = 'TechnicalOrder';
                },

                join: {
                    from: `${this.tableName}.id`,
                    to: `${Order.tableName}.orderableId`,
                },
            },
        };
    }
}

module.exports = TechnicalOrder;
