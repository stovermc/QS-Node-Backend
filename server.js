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
      if (data.rowCount == 0) { return response.sendStatus(404) }
      response.json(data.rows)
    })
})

app.get('/api/v1/foods/:id', function(request, response){
  const id = request.params.id
  Food.findFood(id)
  .then(function(data) {
    const foodData = data
    
    if (data.rowCount == 0) { return response.sendStatus(404) }
    const rawFood = data.rows
    response.json(rawFood)
  })
})

app.post('/api/v1/foods', function (request, response) {
  const food = request.body
    
  if (!food) {
    return response.status(422).send({ error: "You did not provide a food"})
  } else if (!food.name) {
    return response.status(422).send({ error: "Your did not provide a name property for food"})
  } else if (!food.calories) {
    return response.status(422).send({ error: "Your did not provide a calories property for food"})
  }
  
  Food.createFood(food.name, food.calories).then(function() {
    Food.findAll().then(function(data){
      if (data.rowCount == 0) { return response.sendStatus(404) }
      response.json(data.rows)
    })
  })
})

app.put('/api/v1/foods/:id', function(request, response){
  const id = request.params.id
  const params = request.body
  Food.updateFood(params, id)
    .then(function(data){
      const food = data
      if(!food) { response.sendStatus(404) }
      response.json(data)
    })
})


module.exports = app
