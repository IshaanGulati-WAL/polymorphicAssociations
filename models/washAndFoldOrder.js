const Model = require('./index');

class WashAndFoldOrder extends Model {
    static get tableName() {
        return 'washAndFoldOrders';
    }
    static get relationMappings() {
        const Order = require('./order');
        return { 
            orders: {
                relation: Model.HasManyRelation,
                modelClass: Order,

                filter(builder) {
                    builder.where('orderableType', 'WashAndFoldOrder');
                },

                beforeInsert(model) {
                    console.log('Inside the hook model', model);
                    model.orderableType = 'WashAndFoldOrder';
                },

                join: {
                    from: `${this.tableName}.id`,
                    to: `${Order.tableName}.orderableId`,
                },
            },
        };
    }
}

module.exports = WashAndFoldOrder;
