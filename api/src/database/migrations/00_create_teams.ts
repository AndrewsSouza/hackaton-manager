import Knex from 'knex'

export async function up(knex: Knex) {
    return knex.schema.createTable('teams', table => {
        table.increments('id').primary()
        table.string('name').notNullable()
        table.string('url').notNullable().defaultTo('https://cdn.pixabay.com/photo/2016/04/15/18/05/computer-1331579_1280.png')
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('teams')
}