
exports.up = function(knex, Promise) {
    return knex.schema.createTable('actions', tbl => {
        tbl.increments();
        tbl.string('notes', 350)
        tbl.text('description', 250);
        tbl.boolean('complete').notNullable();
        tbl.integer('project_id').notNullable();
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('actions');
};
