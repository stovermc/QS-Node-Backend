exports.up = function(knex, Promise) {
  let createQuery = `CREATE TABLE mealFoods(
    id SERIAL PRIMARY KEY NOT NULL,
    foodId INT,
    mealId INT,
    createdAt TIMESTAMP
  )`;
  return knex.raw(createQuery);
};

exports.down = function(knex, Promise) {
  let dropQuery = `DROP TABLE mealFoods`;
  return knex.raw(dropQuery);
};