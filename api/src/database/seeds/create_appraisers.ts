import Knex from 'knex'

export async function seed(knex: Knex) {
    await knex('appraisers').insert([
        {
            name: 'Cássio',
            cpf: "00000000001",
            password: "$2b$10$b3k21d5fnRwrGV6qgDEuQOgpzJW.b14EKgwmXNNrqVyLVLuiMTRzq",
        },
        {
            name: 'Ana Paula',
            cpf: "00000000002",
            password: "$2b$10$Ri1vnji/v4gm3FxHZrZHEe/r9LjO2xuULEbjcLcjPnvFruAB9Rb8u",
        },
        {
            name: 'Alessandra',
            cpf: "00000000003",
            password: "$2b$10$BexNhjZjANv0BM.TGLvVButqEYUyTHVlgJOTZ8qizBkLtKZ./QKWK",
        },
    ])
}