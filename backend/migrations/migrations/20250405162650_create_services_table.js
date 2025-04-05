/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('services', (table) => {
        table.increments('id').primary(); // ID autoincremental
        table.string('name').notNullable(); // Nombre del servicio
        table.string('descripcion').notNullable(); // descripcion
        table.integer('price').notNullable(); // precio
        table.boolean('status').notNullable();
        table.timestamps(true, true); // created_at y updated_at
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('services');
};
