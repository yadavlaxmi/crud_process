

exports.up = async function(knex) {
    const exists = await knex.schema.hasTable('users');
    if (!exists) {
      return knex.schema.createTable('users', function(table) {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable().unique();
        table.timestamps(true, true);
      });
    }
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
  };
  