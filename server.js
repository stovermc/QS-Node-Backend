const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const Food = require('./lib/models/food')
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const pry = require('pryjs')


app.set('port', process.env.PORT || 3000)
app.locals.title = 'Quantified Self'

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(app.get('port'), function() {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`)
})

app.get('/', function(request, response) {
  response.send('Welcome to Quantified Self!')
})

app.get('/api/v1/foods', function(request, response){
  const id = request.params.id
  Food.findAll()
  .then( function(data) {
    const foodData = data

    if (data.rowCount == 0) { return response.sendStatus(404) }
    const rawFoods = data.rows
    const foods = rawFoods.map(function (food){
      return { id: food.id, name: food.name, calories: food.calories, created_at: food.created_at }
    })
    response.json({foods})
  })
})


module.exports = app
