
exports.up = function(knex, Promise) {
    return knex.schema.createTable('projects', tbl => {
        tbl.increments();
        tbl.string('name', 50).notNullable().unique();
        tbl.text('description', 250);
        tbl.boolean('complete').notNullable();
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('projects');
};
