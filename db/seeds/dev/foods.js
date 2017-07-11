exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE foods RESTART IDENTITY')
  .then(function() {
    // return Promise.all([
      return knex.raw(
        'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)',
        ['Banana', 34, new Date]
      ).then(function(){
        return knex.raw(
          'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)',
          ['French Silk Pie', 340, new Date]
        )
      }).then(function(){
        return knex.raw(
          'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)',
          ['Orange', 34, new Date]
        )
      }).then(function(){
        return knex.raw(
          'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)',
          ['Deep Dish Pizza', 890, new Date]
        )
      }).then(function(){
        return knex.raw(
          'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)',
          ['Spinach Salad w/ dressing', 240, new Date]
        )
      }).then(function(){
        return knex.raw(
          'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)',
          ['Roasted Cauliflower', 240, new Date]
        )
      }).then(function(){
        return knex.raw(
          'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)',
          ['Chicken Breast', 210, new Date]
        )
      }).then(function(){
        return knex.raw(
          'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)',
          ['Dark Chocolate', 150, new Date]
        )
      }).then(function(){
        return knex.raw(
          'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)',
          ['Beef Jerky', 95, new Date]
        )
      })
    // ]);
  });
};
