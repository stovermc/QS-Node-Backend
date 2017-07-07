
exports.up = function(knex, Promise) {
  return knex.schema.table('foods', function(data) {
    data.boolean('active').defaultTo(true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('foods', function(data) {
  data.dropColumn('active');
  });
};
