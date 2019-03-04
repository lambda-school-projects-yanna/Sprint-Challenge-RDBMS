
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('projects').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        {name: 'Project 1', description: 'Desciption', complete: false},
        {name: 'Project 2', description: 'Desciption', complete: false},
        {name: 'Project 3', description: 'Desciption', complete: false}
      ]);
    });
};
