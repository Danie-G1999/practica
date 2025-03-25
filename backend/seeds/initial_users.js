/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const bcrypt = require('bcryptjs');
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {
      name: 'Web Master',
      email: 'webmaster@gmail.com',
      password: await bcrypt.hash('123456', 10), // Contraseña encriptada
    },
  ]);
};
