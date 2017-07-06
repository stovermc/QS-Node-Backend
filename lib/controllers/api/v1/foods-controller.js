const Food = require('../../../models/food')

exports.index = function(request, response){
  const id = request.params.id
  Food.findAll()
  .then( function(data) {
    if (data.rowCount == 0) { return response.sendStatus(404) }
    response.json(data.rows)
  })
}

exports.show = function(request, response){
  const id = request.params.id
  Food.findFood(id)
    .then(function(data) {
      if (data.rowCount == 0) { return response.sendStatus(404) }
      response.json(data.rows)
    })
}

exports.create = function (request, response) {
  const food = request.body

  if (!food) {
    return response.status(422).send({ error: "You did not provide a food"})
  } else if (!food.name) {
    return response.status(422).send({ error: "Your did not provide a name property for food"})
  } else if (!food.calories) {
    return response.status(422).send({ error: "Your did not provide a calories property for food"})
  }

  Food.createFood(food.name, food.calories).then(function() {
    Food.findAll().then(function(data){
      if (data.rowCount == 0) { return response.sendStatus(404) }
      response.json(data.rows)
    })
  })
}

exports.update = function(request, response){
  const id = request.params.id
  const params = request.body
  if ((params['name'] || params['calories']) && !params['id'] && !params['created_at']) {
    Food.updateFood(params, id)
      .then(function(data){
        if(!data) { response.sendStatus(404) }
        response.json(data)
      })
  } else {
    return response.status(422).send({ error: "Your properties are incorrect."})
  }

}

exports.destroy = function(request, response){
  const id = request.params.id

  Food.findFood(id)
    .then(function(data) {
      if (data.rowCount == 0) {
        response.status(422).send({ error: "That id does not exist"})
      } else {
        Food.destroyFood(id).then(function(data){
          Food.findAll().then(function(data){
            if (data.rowCount == 0) { return response.sendStatus(404) }
            response.json(data.rows)
          })
        })
      }
    })

}
