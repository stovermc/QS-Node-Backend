const Meal = require('../../../models/meal')

exports.index = function(request, response) {
  const id = request.params.id
  Meal.findAll()
    .then( function(data) {
      if (data.rowCount == 0) { return response.sendStatus(404) }
      response.json(data.rows)
    })
}

exports.show = function(request, response) {
  const id = request.params.id
  Meal.find(id)
    .then(function(data) {
      const meal = data.rows[0]
      Meal.foods(id)
        .then(function(data) {
          if (data.rowCount == 0) { return response.sendStatus(404) }
          response.json({name: meal.name, caloricGoal: meal.caloricgoal, foods: data.rows})
        })
    })
}
