const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);

function emptyMealFoodsTable() {
  return database.raw(`TRUNCATE mealFoods RESTART IDENTITY`)
}

function create(mealId, foodId) {
  return database.raw('INSERT INTO mealFoods (foodId, mealId, createdAt) VALUES (?, ?, ?)', [foodId, mealId, new Date])
}

function findAll(){
  return database.raw(`SELECT * FROM mealFoods`)
}

function find(id){
  return database.raw(`SELECT * FROM mealFoods WHERE id=?`, [id])
}

function destroy(id) {
  return database.raw(`DELETE FROM mealFoods WHERE id=? RETURNING *`, [id])
}

module.exports = {
  emptyMealFoodsTable,
  create,
  findAll,
  find,
  destroy
}
