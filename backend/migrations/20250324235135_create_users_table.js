/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments('id').primary(); // ID autoincremental
        table.string('name').notNullable(); // Nombre del usuario
        table.string('email').notNullable().unique(); // Correo único
        table.string('password').notNullable(); // Contraseña
        table.timestamps(true, true); // created_at y updated_at
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
