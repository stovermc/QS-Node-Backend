const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);

function createMeal(name, caloricGoal) {
    return database.raw(`INSERT INTO meals (name, caloricGoal, createdAt) VALUES (?, ?, ?)`,
    [name, caloricGoal, new Date])
}

function findAll(){
  return database.raw(`SELECT * FROM meals`)
}

function find(id) {
  return database.raw('SELECT * FROM meals WHERE id=?', [id])
}

function foods(mealId){
  // return database.raw('SELECT * FROM foods f INNER JOIN mealFoods mf ON f.id = mf.foodId WHERE mealId = ?;', [mealId])
  return database.raw('SELECT f.id, f.name, f.calories FROM meals m JOIN mealFoods ON m.id = mealFoods.mealId JOIN foods f ON f.id = mealFoods.foodId WHERE m.id = ?;', [mealId])
}

function emptyMealsTable() {
  return database.raw(`TRUNCATE meals RESTART IDENTITY`)
}

module.exports = {
  createMeal,
  findAll,
  find,
  foods,
  emptyMealsTable
}
