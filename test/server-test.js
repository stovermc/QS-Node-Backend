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

  describe('GET /', function() {
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

      this.timeout(100000000)
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
  })

})
