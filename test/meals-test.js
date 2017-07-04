const assert = require("chai").assert
const app = require("../server")
const request = require("request")
const Meal = require("../lib/models/meal")
const Food = require("../lib/models/food")
const MealFood = require("../lib/models/meal-food")

describe('Server connection', function() {
  before(function(done) {
    this.port = 9876
    this.server = app.listen(this.port, function (error, result) {
      if (error) { done(error) }
      done()
    })
    this.request = request.defaults({
      baseUrl: 'http://localhost:9876/'
    })
  })

  after( function() {
    this.server.close()
  })
  
  describe('GET /api/v1/meals', function() {
    beforeEach(function(done) {
      Meal.createMeal('Breakfast', 400)
        .then(function() {
          Food.createFood('smoothie', 150)
            .then(function() { 
              Meal.addFood(1,1)
                .then(function(){done() })
            })
        })
    })

    afterEach(function(done) {
      Meal.emptyMealsTable()
        .then(function() { 
          Food.emptyFoodsTable()
            .then(function() {
              MealFood.emptyMealFoodsTable()
                .then(function() { done() })
            })
        })
    })    

    this.timeout(100000)
    it('should list all meals with their id, name calorie goal & foods', function(done) {
      const ourRequest = this.request
      Meal.findAll()
        .then(function(data){
          const id = data.rows[0].id
          const name =  data.rows[0].name
          const caloricGoal =  data.rows[0].caloricGoal
          const foods =  data.rows[0].foods
          ourRequest.get('/api/v1/meals', function(error, response){
            if (error) { done(error) }
            const parsedMeal = JSON.parse(response.body)
            assert.equal(parsedMeal[0].id, id)
            assert.equal(parsedMeal[0].name, name)
            assert.equal(parsedMeal[0].caloricGoal, caloricGoal)
            assert.equal(parsedMeal[0].foods.length, 1)
            assert.equal(parsedMeal[0].foods[0].name, foods[0].name)
            assert.equal(parsedMeal[0].foods[0].calories, foods[0].calories)
            assert.equal(parsedMeal.length, 1)
            assert.ok(parsedMeal[0].created_at)
            done()
          })
        })
    })
  })
  
})