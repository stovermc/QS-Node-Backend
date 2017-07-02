const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const database = require('knex')(configuration)
const pry = require('pryjs')

function findAll() {
  return database.raw('SELECT * FROM foods')
}

function findFood(id) {
  return database.raw('SELECT * FROM foods WHERE id=?', [id])
}

function createFood(name, calories) {
  return database.raw(
    'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)',
      [name, calories, new Date]
  )
}

function updateFood(params, id) {
  return database.raw(
    'UPDATE foods SET name=?, calories=? WHERE id=? RETURNING *',
      [params.name, params.calories, id]).then(function(data) {
        return data.rows
      })
}

function emptyFoodsTable() {
  return database.raw('TRUNCATE foods RESTART IDENTITY')
}

module.exports = {
  findAll,
  findFood,
  createFood,
  updateFood,
  emptyFoodsTable
}
