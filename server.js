const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const foodsController = require('./lib/controllers/api/v1/foods-controller.js')

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


module.exports = app
