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