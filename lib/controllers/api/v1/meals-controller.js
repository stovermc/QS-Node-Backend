const Meal = require('../../../models/meal')

exports.index = function(request, response){
  const id = request.params.id
  Meal.findAll()
    .then( function(data) {
      if (data.rowCount == 0) { return response.sendStatus(404) }
      response.json(data.rows)
    })
}
