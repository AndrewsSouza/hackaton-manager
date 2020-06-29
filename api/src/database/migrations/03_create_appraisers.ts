import Knex from 'knex'

export async function up(knex: Knex) {
    return knex.schema.createTable('appraisers', table => {
        table.increments('id').primary()
        table.string('name').notNullable()
        table.string('cpf', 11).notNullable().unique()
        table.string('password').notNullable()
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('appraisers')
}