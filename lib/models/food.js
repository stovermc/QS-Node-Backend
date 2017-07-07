const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const database = require('knex')(configuration)

function findAll() {
  return database.raw('SELECT * FROM foods WHERE active=true')
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
  if (params.name && params.calories) {
    return database.raw(
      'UPDATE foods SET name=?, calories=? WHERE id=? RETURNING *',
        [params.name, params.calories, id]).then(function(data) {
          return data.rows
        })
  } else if (params.name) {
    return database.raw(
      'UPDATE foods SET name=? WHERE id=? RETURNING *',
        [params.name, id]).then(function(data) {
          return data.rows
        })
  } else {
    return database.raw(
      'UPDATE foods SET calories=? WHERE id=? RETURNING *',
        [params.calories, id]).then(function(data) {
          return data.rows
        })
  }
}

function destroyFood(id) {
  return database.raw(
    'UPDATE foods SET active=? WHERE id=? RETURNING *', [false, id])
}

function emptyFoodsTable() {
  return database.raw('TRUNCATE foods RESTART IDENTITY')
}

module.exports = {
  findAll,
  findFood,
  createFood,
  updateFood,
  destroyFood,
  emptyFoodsTable
}
