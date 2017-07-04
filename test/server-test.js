const assert = require("chai").assert
const app = require("../server")
const request = require("request")
const Food = require("../lib/models/food")
const pry = require('pryjs')

describe('server', function() {
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

  it('should exist', function(){
    assert(app)
  })

  describe('GET', function() {
    it('should return a 200', function(done) {
      this.request.get('/', function(error, response) {
        if (error) { done(error) }
        assert.equal(response.statusCode, 200)
        done()
      })
    })

    it('should have a body with the name of the application', function(done) {
      this.request.get('/', function(error, response){
        if (error) { done(error) }
        assert.include(response.body, app.locals.title)
        done()
      })
    })

    describe('GET /api/v1/foods', function() {
      beforeEach(function(done) {
        Food.createFood('carrot', 30)
          .then(function() {
            Food.createFood('apple', 25)
              .then(function() { done() })
          })
      })

      afterEach(function(done) {
          Food.emptyFoodsTable()
            .then(function() { done() })
      })

      it('should a list of all foods with their id, name and calories', function(done) {
        const ourRequest = this.request
        Food.findAll()
          .then(function(data){
            const id = data.rows[0].id
            const name =  data.rows[0].name
            const calories =  data.rows[0].calories
            ourRequest.get('/api/v1/foods', function(error, response){
              if (error) { done(error) }
              const parsedFood = JSON.parse(response.body)
              assert.equal(parsedFood['foods'][0].id, id)
              assert.equal(parsedFood['foods'][0].name, name)
              assert.equal(parsedFood['foods'][0].calories, calories)
              assert.equal(parsedFood['foods'].length, 2)
              assert.ok(parsedFood['foods'][0].created_at)
              done()
            })
          })
      })
    })

    describe('GET /api/v1/foods/:id', function(){
      beforeEach(function(done){
        Food.createFood('muffin', 150)
          .then(function() { done() })
      })

      afterEach(function(done){
        Food.emptyFoodsTable()
          .then(function() { done() })
      })


      it('should return a 200', function(done){
        const ourRequest = this.request
        Food.findFood(1)
          .then(function(data){
            const id = data.rows[0].id
            const name =  data.rows[0].name
            const calories =  data.rows[0].calories

            ourRequest.get(`/api/v1/foods/${id}`, function(error, response){
              if (error) { done(error) }
              assert.equal(response.statusCode, 200)
              done()
            })
          })
      })

      this.timeout(100000000)

      it('should return a single food', function(done){
        const ourRequest = this.request
        Food.findFood(1)
          .then(function(data){
            const id = data.rows[0].id
            const name =  data.rows[0].name
            const calories =  data.rows[0].calories

            ourRequest.get(`/api/v1/foods/${id}`, function(error, response){
              if (error) { done(error) }
              const parsedFood = JSON.parse(response.body)
              assert.equal(parsedFood[0].id, id)
              assert.equal(parsedFood[0].name, name)
              assert.equal(parsedFood[0].calories, calories)
              done()
            })
        })
      })
    })
  })
  
  describe('POST', function() {
    
    describe('POST /api/v1/foods', function() {
      this.timeout(100000000)
  
      afterEach(function(done) {
          Food.emptyFoodsTable()
            .then(function() { done() })
      })
  
      it('should post a food to foods', function(done) {
        const ourRequest = this.request
        const cottonCandy = {name: 'big fluffy cotton candy', calories: 300}
        Food.findAll()
          .then(function(data){
            const foods = data.rows
            assert.equal(foods.length, 0)
          })
        
        ourRequest.post('/api/v1/foods', { form: cottonCandy }, function(error, response) {
          if (error) { done(error) }
          
          const foods = JSON.parse(response.body)
          assert.equal(foods.length, 1)
          assert.equal(foods[0].id, 1)
          assert.equal(foods[0].name, cottonCandy.name)
          assert.equal(foods[0].calories, cottonCandy.calories)
          assert.ok(foods[0].created_at)
          done()
        })
      })
      
      it('should return a 422 if no food is given', function(done){
        const ourRequest = this.request
        const noFood = {}
        
        ourRequest.post('/api/v1/foods', { form: noFood }, function(error, response) {
          if (error) { done(error) }
          
          assert.equal(response.statusCode, 422)
          
          Food.findAll()
            .then(function(data){
              const foods = data.rows
              assert.equal(foods.length, 0)
              done()
            })
        })
      })
      
      it('should return a 422 if no name is given', function(done) {
        const ourRequest = this.request
        const noName = {name: "", calories: 50}
        
        ourRequest.post('/api/v1/foods', { form: noName }, function(error, response) {
          if (error) { done(error) }
          
          assert.equal(response.statusCode, 422)
          
          Food.findAll()
            .then(function(data){
              const foods = data.rows
              assert.equal(foods.length, 0)
              done()
            })
        })
      })
      
      it('should return a 422 if no calories are given', function(done) {
        const ourRequest = this.request
        const noCalories = {name:"suga cube", calories: ""}
        
        ourRequest.post('/api/v1/foods', { form: noCalories }, function(error, response) {
          if (error) { done(error) }
          
          assert.equal(response.statusCode, 422)
          
          Food.findAll()
            .then(function(data){
              const foods = data.rows
              assert.equal(foods.length, 0)
              done()
            })
        })
      })
    })
  })

  describe('PUT', function(){
    describe('PUT /api/v1/foods/:id', function(){
      beforeEach(function(done){
        Food.createFood('muffin', 150)
          .then(function() { done() })
      })

      afterEach(function(done){
        Food.emptyFoodsTable()
          .then(function() { done() })
      })

      this.timeout(100000000)
      it('should return a 200', function(done) {
        const ourRequest = this.request
        const id = 1
        const food_params = {name: 'steak', calories: 400}

        ourRequest.put(`/api/v1/foods/${id}`, {form: food_params}, function(error, response){
          if (error) { done(error) }
          assert.equal(response.statusCode, 200)
          done()
        })
      })

      it('should update a food', function(done){
        const ourRequest = this.request
        const id = 1
        const food_params = {name: 'steak', calories: 400}

        ourRequest.put(`/api/v1/foods/${id}`, {form: food_params}, function(error, response){
          if (error) { done(error) }
          const parsedFood = JSON.parse(response.body)
          assert.equal(parsedFood[0].id, id)
          assert.equal(parsedFood[0].name, food_params.name)
          assert.equal(parsedFood[0].calories, food_params.calories)
          done()
        })
      })
    })
  })
  
  describe('DELETE', function() {
    
    describe('DELETE /api/v1/foods/:id', function() {
      this.timeout(100000000)
  
      beforeEach(function(done) {
        Food.createFood('burger', 400)
          .then(function() {
            Food.createFood('fries', 150)
              .then(function() { done() })
          })
      })
  
      afterEach(function(done) {
          Food.emptyFoodsTable()
            .then(function() { done() })
      })
  
      // it('should delete a food from foods based on id', function(done) {
      //   const ourRequest = this.request
      //   const id = 1
      //   
      //   Food.findAll()
      //   .then(function(data){
      //     const foods = data.rows
      //     assert.equal(foods.length, 2)
      //   })
      //   
      //   ourRequest.delete(`/api/v1/foods/${id}`, function(error, response) {
      //     if (error) { done(error) }
      //     
      //     const foods = JSON.parse(response.body)
      //     assert.equal(foods.length, 1)
      //     done()
      //   })
      // })
      
      it ('should return a 422 if id does not exist', function(done) {
        const ourRequest = this.request
        const id = 3
        
        ourRequest.delete(`/api/v1/foods/${id}`, function(error, response) {
          if (error) { done(error) }
          
          assert.equal(response.statusCode, 422)
          
          Food.findAll()
            .then(function(data){
              const foods = data.rows
              assert.equal(foods.length, 2)
              done()
            })
        })
      })
    })
  })
})
