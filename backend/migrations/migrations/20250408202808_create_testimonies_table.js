/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('testimonies', (table) => {
        table.increments('id').primary(); // ID autoincremental
        table.string('name').notNullable();
        table.string('descripcion').notNullable();
        table.string('image').notNullable();
        table.date('date').notNullable();
        table.integer('calification').notNullable();
        table.timestamps(true, true); // created_at y updated_at
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('testimonies');
};
