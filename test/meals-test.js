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

  beforeEach(function(done) {
    Meal.createMeal('Breakfast', 400)
    .then(function() {
      Food.createFood('smoothie', 150)
      .then(function() {
        MealFood.create(1,1)
        .then(function(){ done() })
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

  describe('GET /api/v1/meals', function() {

    this.timeout(1000000)
    it('should list all meals with their id, name and calorie goal', function(done) {

      const ourRequest = this.request
      Meal.findAll()
        .then(function(data){
          const id = data.rows[0].id
          const name =  data.rows[0].name
          const caloricGoal =  data.rows[0].caloricGoal
          ourRequest.get('/api/v1/meals', function(error, response){
            if (error) { done(error) }
            const parsedMeal = JSON.parse(response.body)
            assert.equal(parsedMeal[0].id, id)
            assert.equal(parsedMeal[0].name, name)
            assert.equal(parsedMeal[0].caloricGoal, caloricGoal)
            assert.equal(parsedMeal.length, 1)
            assert.ok(parsedMeal[0].createdat)
            done()
          })
        })
    })
  })

  describe('GET /api/v1/meals/:id', function(request, response){
    this.timeout(1000000)
    it('should list a single meal and its associated foods', function(done){

      const ourRequest = this.request
      const id = 1

      Meal.foods(id)
        .then(function(data){
          const foodId = data.rows[0].id
          const foodName =  data.rows[0].name
          const foodCalories =  data.rows[0].calories
          Meal.find(id).then(function(data){
            const mealName = data.rows[0].name
            const caloricGoal = data.rows[0].caloricgoal

          ourRequest.get(`/api/v1/meals/${id}`, function(error, response){
            if (error) { done(error) }
            const parsedMeal = JSON.parse(response.body)
            assert.equal(parsedMeal.foods[0].id, foodId)
            assert.equal(parsedMeal.foods[0].name, foodName)
            assert.equal(parsedMeal.foods[0].calories, foodCalories)
            assert.equal(parsedMeal.caloricGoal, caloricGoal)
            assert.equal(parsedMeal.name, mealName)
            done()
          })
        })
      })
    })
  })

})
