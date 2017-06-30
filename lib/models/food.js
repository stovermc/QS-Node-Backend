const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const database = require('knex')(configuration)

// class Food {
//   constructor(name, calories){
//     this.name = name
//     this.calories = calories
//   }
//   findAll() {
//     return database.raw('SELECT * FROM foods')
//   }
//
//
// }

function findAll() {
  return database.raw('SELECT * FROM foods')
}

function createFood(name, calories) {
  return database.raw(
    'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)',
    [name, calories, new Date]
  )
}

function emptyFoodsTable() {
  return database.raw('TRUNCATE foods RESTART IDENTITY')
}

module.exports = {
  findAll,
  createFood,
  emptyFoodsTable
}
