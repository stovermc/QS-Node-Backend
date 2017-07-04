const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);

function emptyMealFoodsTable() {
  return database.raw(`TRUNCATE mealFoods RESTART IDENTITY`)
}

module.exports = {
  emptyMealFoodsTable
}