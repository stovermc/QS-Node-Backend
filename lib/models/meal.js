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
  return database.raw('SELECT f.id, f.name, f.calories, mf.id AS mealFoodId FROM meals m JOIN mealFoods mf ON m.id = mf.mealId JOIN foods f ON f.id = mf.foodId WHERE m.id = ?;', [mealId])
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
