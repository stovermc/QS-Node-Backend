
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('table_name').del()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        {id: 1, colName: 'rowValue1'},
        {id: 2, colName: 'rowValue2'},
        {id: 3, colName: 'rowValue3'}
      ]);
    });
};


exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE foods RESTART IDENTITY')
  .then(function() {
    return Promise.all([
      knex.raw(
        'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)',
        ["", new Date]
      ),
      knex.raw(
        'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)',
        ["I love rap music", new Date]
      ),
      knex.raw(
        'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)',
        ["I hate game shows", new Date]
      )
    ]);
  });
};
