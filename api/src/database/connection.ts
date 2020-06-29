import knex from 'knex'
import path from 'path'

const connection = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite'),
        multipleStatements: true
    },
    pool: {
        afterCreate: (conn: any, cb: any) =>
            conn.run('PRAGMA foreign_keys = ON', cb),
        max: 5,
    },
    useNullAsDefault: true,
})

export default connection