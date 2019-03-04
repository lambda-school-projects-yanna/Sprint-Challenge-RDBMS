
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('actions').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('actions').insert([
        {description: "description", notes: "some notes", complete: false, project_id: 1},
        {description: "description", notes: "some notes", complete: false, project_id: 2},
        {description: "description", notes: "some notes", complete: false, project_id: 3},
      ]);
    });
};
