exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE foods RESTART IDENTITY')
  .then(function() {
      return knex.raw(
        'INSERT INTO meals (name, caloricGoal, createdAt) VALUES (?, ?, ?)',
        ['Breakfast', 400, new Date]
      )
    }).then(function() {
      return knex.raw(
        'INSERT INTO meals (name, caloricGoal, createdAt) VALUES (?, ?, ?)',
        ['Lunch', 600, new Date]
      )
    }).then(function() {
      return knex.raw(
        'INSERT INTO meals (name, caloricGoal, createdAt) VALUES (?, ?, ?)',
        ['Dinner', 800, new Date]
      )
    }).then(function() {
      return knex.raw(
        'INSERT INTO meals (name, caloricGoal, createdAt) VALUES (?, ?, ?)',
        ['Snacks', 200, new Date]
      )
    })
}
