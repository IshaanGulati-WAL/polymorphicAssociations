const Model = require('./index');

class User extends Model {
    static get tableName () {
        return 'users';
    }
}

module.exports = exports = User;
