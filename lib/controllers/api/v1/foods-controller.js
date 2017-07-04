const Food = require('../../../models/food')

exports.index = function(request, response){
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
}

exports.show = function(request, response){
  const id = request.params.id
  Food.findFood(id)
    .then(function(data) {

      if (data.rowCount == 0) { return response.sendStatus(404) }
      const rawFood = data.rows
      response.json(rawFood)
    })
}

exports.create = function (request, response) {
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
      const rawFoods = data.rows
      const foods = rawFoods.map(function (food){
        return { id: food.id, name: food.name, calories: food.calories, created_at: food.created_at }
      })
      response.json(foods)
    })
  })
}

exports.update = function(request, response){
  const id = request.params.id
  const params = request.body
  Food.updateFood(params, id)
    .then(function(data){
      const food = data
      if(!food) { response.sendStatus(404) }
      response.json(data)
    })
}