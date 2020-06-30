import Knex from 'knex'

export async function up(knex: Knex) {
    return knex.schema.createTable('students', table => {
        table.increments('id').primary()
        table.integer('teamId').nullable().references('id').inTable('teams')
        table.string('url').notNullable().defaultTo('https://cdn0.iconfinder.com/data/icons/basic-7/97/34-512.png')
        table.string('name').notNullable()
        table.string('program').notNullable()
        table.boolean('teamMember').notNullable().defaultTo(false)
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('students')
}