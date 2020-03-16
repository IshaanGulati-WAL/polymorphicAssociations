// For adding payment details create a new migration.
exports.up = function(knex) {
    return knex.schema.createTable('selfServeOrders', function (table) {
        table.increments('id');
        table.integer('customerId').notNullable();;
        table.foreign('customerId').references('id').inTable('users');
        table.string('status');
        table.uuid('uuid');
        table.float('totalAmount');
        table.float('salesTax');
        table.float('tipAmount');
        table.jsonb('lineItems');
        table.integer('storeId').notNullable();
        table.foreign('storeId').references('id').inTable('stores');
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('selfServeOrders');
  };
  