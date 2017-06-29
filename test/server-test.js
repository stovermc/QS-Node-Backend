const assert = require("chai").assert
const app = require("../server")
const request = require("request")
var pry = require('pryjs')

describe('server', () => {
  before( (done) => {
    this.port = 9876
    this.server = app.listen(this.port, function (error, result) {
      if (error) { done(error) }
      done()
    })
    this.request = request.defaults({
      baseUrl: 'http://localhost:9876/'
    })
  })

  after( () => {
    this.server.close()
  })

  it('should exist', function(){
    assert(app)
  })

  describe('GET /', () => {
    it('should return a 200', (done) => {
      this.request.get('/', function(error, response) {
        if (error) { done(error) }
        assert.equal(response.statusCode, 200)
        done()
      })
    })

    it('should have a body with the name of the application', (done) => {
      this.request.get('/', function(error, response){
        if (error) { done(error) }
        assert.include(response.body, app.locals.title)
        done()
      })
    })

    describe('GET /api/v1/foods', () => {
      this.timeout(1000000000)
      it('should a list of all foods with their id, name and calories', (done) => {
        var ourRequest = this.request
        ourRequest.get('/api/v1/foods', function(error, response) {
          if (error) { done(error) }
          Food.findAll()
            .then(function(data){
              var id = data.rows[0].id
              var name =  data.rows[0].name
              var calories =  data.rows[0].calories
              eval(pry.it)
              ourRequest.get('/api/v1/foods', function(error, response){
                if (error) { done(error) }
                var parsedFood = JSON.parse(response.body)
                assert.equal(parsedFood[0].id, id)
                assert.equal(parsedFood[0].name, name)
                assert.equal(parsedFood[0].calories, calories)
                assert.ok(parsedFood[0].createdAt)
                done()
              })
            })
        })
      })
    })
  })

})
