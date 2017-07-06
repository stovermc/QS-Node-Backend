const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const foodsController = require('./lib/controllers/api/v1/foods-controller.js')
const mealsController = require('./lib/controllers/api/v1/meals-controller')
const mealFoodsController = require('./lib/controllers/api/v1/meal-foods-controller')

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

app.get('/api/v1/foods', foodsController.index)
app.get('/api/v1/foods/:id', foodsController.show)
app.post('/api/v1/foods', foodsController.create)
app.put('/api/v1/foods/:id', foodsController.update)
app.delete('/api/v1/foods/:id', foodsController.destroy)

app.get('/api/v1/meals', mealsController.index)
app.get('/api/v1/meals/:id', mealsController.show)

app.post('/api/v1/mealFoods/', mealFoodsController.create)
app.delete('/api/v1/mealFoods/:id', mealFoodsController.destroy)

module.exports = app
