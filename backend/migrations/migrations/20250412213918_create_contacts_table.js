/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('contacts', (table) => {
        table.increments('id').primary(); // ID autoincremental
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('phone', 15).notNullable();
        table.string('message').notNullable();
        table.boolean('status').defaultTo(true);
        table.timestamps(true, true); // created_at y updated_at
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('contacts');
};
