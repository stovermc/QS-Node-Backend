const Meal = require('../../../models/meal')

exports.index = function(request, response){
  const id = request.params.id
  Meal.findAll()
    .then( function(data) {
      if (data.rowCount == 0) { return response.sendStatus(404) }
      data.rows.forEach(function(meal){
        Meal.foods(meal.id).then(function(foodData) {
          meal.foods = foodData.rows.map(function (food){
            return {id:food.foodid, name:food.foodname, calories:food.foodcalories}
          })
        })
      })
      var pry = require("pryjs"); eval(pry.it)
      response.json(data.rows)
    })
}