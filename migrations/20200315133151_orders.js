
exports.up = function(knex) {
    return knex.schema.createTable('orders', function(table) {
        table.increments('id');
        table.string('orderableType').notNullable();
        table.integer('orderableId').notNullable();
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt').defaultTo(knex.fn.now());
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('orders');
  };
  