import Knex from 'knex'

export async function up(knex: Knex) {
    return knex.schema.createTable('ratings', table => {
        table.increments('id').primary()
        table.integer('teamId').notNullable().references('id').inTable('teams')
        table.integer('appraiserId').notNullable().references('id').inTable('appraisers')
        table.integer('working').notNullable()
        table.integer('process').notNullable()
        table.integer('pitch').notNullable()
        table.integer('innovation').notNullable()
        table.integer('team').notNullable()
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('ratings')
}