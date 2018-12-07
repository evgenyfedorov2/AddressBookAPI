'use strict'

module.exports = {
  up: knex => knex.schema.createTable('contacts', table => {
    table.increments('id').primary()
    table.string('name').notNullable()
    table.string('email').notNullable()
    table.integer('birth_year').notNullable()
    table.text('mobilePhone')
    table.integer('user_id')
    table.foreign('user_id').references('users.id').onDelete('CASCADE')
    table.timestamps()
  }),

  down: knex => knex.schema.dropTableIfExists('contacts'),
}
