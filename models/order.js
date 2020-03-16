const Model = require('./index');

class Order extends Model {
    static get tableName() {
        return 'orders';
    }

    static get idColumn() {
        return 'id';
    }

    static get relationMappings() {

        const WashAndFoldOrder = require('./washAndFoldOrder');

        return {
            washAndFoldOrders: {
                relation: Model.HasManyRelation,
                modelClass: WashAndFoldOrder,
                join: {
                    from: `${this.tableName}.orderableId`,
                    to: `${WashAndFoldOrder.tableName}.id`,
                }
            }
        }
    }
}

module.exports = Order;
