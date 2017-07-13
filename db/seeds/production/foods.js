exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE foods RESTART IDENTITY')
  .then(function() {
    return knex.raw(
      'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)',
      ['Lacey Pancakes', 200, new Date]
    ).then(function(){
      return knex.raw(
        'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)',
        ['Minted Lamb Pasties', 240, new Date]
      )
    }).then(function(){
      return knex.raw(
        'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)',
        ['Chai-Spiced Ginger and Date Tea Loaf', 430, new Date]
      )
    }).then(function(){
      return knex.raw(
        'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)',
        ['Sugar Plum Fairy Cakes', 250, new Date]
      )
    }).then(function(){
      return knex.raw(
        'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)',
        ['Spinach Beet Goat Cheese Salad', 140, new Date]
      )
    }).then(function(){
      return knex.raw(
        'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)',
        ['Chicken, Bacon and Butternut Squash Pie', 440, new Date]
      )
    }).then(function(){
      return knex.raw(
        'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)',
        ['Schichttorte', 110, new Date]
      )
    }).then(function(){
      return knex.raw(
        'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)',
        ['Twisty Rye Breadsticks', 150, new Date]
      )
    }).then(function(){
      return knex.raw(
        'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)',
        ['Orange and Lemon Curd Pots', 200, new Date]
      )
    })
  });
};
