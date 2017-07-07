
exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE mealFoods RESTART IDENTITY')
  .then(function() {
    return Promise.all([
      knex.raw(
        'INSERT INTO mealFoods (foodId, mealId, createdAt) VALUES (?, ?, ?)',
        [3, 1, new Date]
      ),
      knex.raw(
        'INSERT INTO mealFoods (foodId, mealId, createdAt) VALUES (?, ?, ?)',
        [1, 1, new Date]
      ),
      knex.raw(
        'INSERT INTO mealFoods (foodId, mealId, createdAt) VALUES (?, ?, ?)',
        [2, 2, new Date]
      ),

      knex.raw(
        'INSERT INTO mealFoods (foodId, mealId, createdAt) VALUES (?, ?, ?)',
        [4, 2, new Date]
      ),
      knex.raw(
        'INSERT INTO mealFoods (foodId, mealId, createdAt) VALUES (?, ?, ?)',
        [5, 3, new Date]
      ),
      knex.raw(
        'INSERT INTO mealFoods (foodId, mealId, createdAt) VALUES (?, ?, ?)',
        [6, 3, new Date]
      ),
      knex.raw(
        'INSERT INTO mealFoods (foodId, mealId, createdAt) VALUES (?, ?, ?)',
        [9, 3, new Date]
      ),
      knex.raw(
        'INSERT INTO mealFoods (foodId, mealId, createdAt) VALUES (?, ?, ?)',
        [8, 4, new Date]
      ),
      knex.raw(
        'INSERT INTO mealFoods (foodId, mealId, createdAt) VALUES (?, ?, ?)',
        [7, 4, new Date]
      ),
    ]);
  });
};
