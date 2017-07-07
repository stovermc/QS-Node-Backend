const MealFood = require('../../../models/meal-food')
const Meal = require('../../../models/meal')

exports.create = function (request, response) {
  const mealFood = request.body
  if (!mealFood) {
    return response.status(422).send({ error: "You did not provide a mealFood"})
  } else if (!mealFood.foodId) {
    return response.status(422).send({ error: "Your did not provide a foodId property for mealFood"})
  } else if (!mealFood.mealId) {
    return response.status(422).send({ error: "Your did not provide a mealId property for mealFood"})
  }
  
  MealFood.create(mealFood.mealId, mealFood.foodId).then(function() {
    Meal.find(mealFood.mealId)
      .then(function(data){
        const meal = data.rows[0]
        Meal.foods(mealFood.mealId)
          .then(function(data) {
            if (data.rowCount == 0) { return response.sendStatus(404) }
            response.json({name: meal.name, caloricGoal: meal.caloricgoal, foods: data.rows})
          })
      })
  })
}

exports.destroy = function(request, response) {
  const id = request.params.id

  MealFood.find(id)
    .then(function(data){
      if (data.rows == 0) {
        response.status(422).send({ error: "That id does not exist"})
      } else {
        const mealId = data.rows[0].mealid
        Meal.find(mealId)
          .then(function(data){
            const meal = data.rows[0]
            MealFood.destroy(id)
            .then(function() {
              Meal.foods(mealId)
              .then(function(data){
                response.json({name: meal.name, caloricGoal: meal.caloricgoal, foods: data.rows})
              })
            })
          })
      }
    })
}
