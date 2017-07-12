exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE meals RESTART IDENTITY')
  .then(function() {
    return Promise.all([
      knex.raw(
        'INSERT INTO meals (name, caloricGoal, createdAt) VALUES (?, ?, ?)',
        ['Breakfast', 400, new Date]
      ),
      knex.raw(
        'INSERT INTO meals (name, caloricGoal, createdAt) VALUES (?, ?, ?)',
        ['Lunch', 600, new Date]
      ),
      knex.raw(
        'INSERT INTO meals (name, caloricGoal, createdAt) VALUES (?, ?, ?)',
        ['Dinner', 600, new Date]
      ),
      knex.raw(
        'INSERT INTO meals (name, caloricGoal, createdAt) VALUES (?, ?, ?)',
        ['Snacks', 200, new Date]
      ),
    ]);
  });
};
