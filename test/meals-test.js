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
        Food.createFood('apple', 100)
          .then(function () {
            MealFood.create(1,1)
            .then(function(){ done() } )
          })
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
            assert.equal(parsedMeal.length, 5)
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

  describe('POST /mealFoods', function() {
    it('should add a relationship of food to meal through mealFoods', function(done) {

      const ourRequest = this.request

      MealFood.findAll()
        .then(function(data){
          const foods = data.rows
          assert.equal(foods.length, 1)
        })

      ourRequest.post('/api/v1/mealFoods', { form: {mealId: 1, foodId: 2} }, function(error, response) {
        if (error) { done(error) }

        MealFood.findAll()
          .then(function(data){
            const foods = data.rows
            assert.equal(foods.length, 2)
          })

        const meal = JSON.parse(response.body)
        assert.equal(meal.foods.length, 2)
        assert.equal(meal.foods[1].name, "apple")
        assert.equal(meal.foods[1].calories, 100)
        done()
      })
    })
  })

  describe('DELETE mealFoods/:id', function() {

    beforeEach(function(done) {
      MealFood.create(1,2)
        .then(function() { done() })
    })

    it('should remove the relationship between a meal and a food', function(done) {
    this.timeout(10000000)

    const ourRequest = this.request
    const id = 2

    MealFood.findAll()
      .then(function(data){
        const mealFoodsCount = data.rows.length
        assert.equal(mealFoodsCount, 2)

        ourRequest.delete(`/api/v1/mealFoods/${id}`, function (error, response) {
          if (error) { done(error) }

          MealFood.findAll()
            .then(function(data){
              const mealFoodsCount = data.rows.length
              assert.equal(mealFoodsCount, 1)
            })

          const meal = JSON.parse(response.body)
          assert.equal(meal.foods.length, 1)
          done()
        })
      })
    })
  })
})
