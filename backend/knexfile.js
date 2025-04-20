// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'pg', // Cliente para PostgreSQL
    connection: process.env.DATABASE_URL,
    // connection: {
    //   host: 'localhost',
    //   user: 'postgres',
    //   password: '1234',
    //   database: 'axan',
    //   port: 5432, // Puerto por defecto de PostgreSQL
    // },
    migrations: {
      directory: './migrations',
    },
    seeds: {
      directory: './seeds',
    },
  },
};

