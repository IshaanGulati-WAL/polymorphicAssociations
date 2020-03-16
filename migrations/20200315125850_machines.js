
exports.up = function(knex) {
  return knex.schema.createTable('machines', function(table) {
      table.increments('id');
      table.integer('storeId').notNullable();
      table.foreign('storeId').references('id').inTable('stores');
      table.string('name');
      table.timestamp('createdAt').defaultTo(knex.fn.now());
      table.timestamp('updatedAt').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('machines');
};
