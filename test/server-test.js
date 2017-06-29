const assert = require("chai").assert
const app = require("../server")
const request = require("request")

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
    
  })
  
})