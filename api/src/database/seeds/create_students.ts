import Knex from 'knex'

export async function seed(knex: Knex) {
    await knex('students').insert([
        {
            url: 'https://cdn0.iconfinder.com/data/icons/basic-7/97/34-512.png',
            name: 'Aline',
            program: "ES",
        },
        {
            url: 'https://cdn0.iconfinder.com/data/icons/basic-7/97/34-512.png',
            name: 'Douglas',
            program: "SI",
        },
        {
            url: 'https://cdn0.iconfinder.com/data/icons/basic-7/97/34-512.png',
            name: 'Edna',
            program: "SI",
        },
        {
            url: 'https://cdn0.iconfinder.com/data/icons/basic-7/97/34-512.png',
            name: 'Flavia',
            program: "CC",
        },
        {
            url: 'https://cdn0.iconfinder.com/data/icons/basic-7/97/34-512.png',
            name: 'Gerson',
            program: "CC",
        },
        {
            url: 'https://cdn0.iconfinder.com/data/icons/basic-7/97/34-512.png',
            name: 'Jorge',
            program: "ES",
        },
        {
            url: 'https://cdn0.iconfinder.com/data/icons/basic-7/97/34-512.png',
            name: 'Maria',
            program: "CC",
        },
        {
            url: 'https://cdn0.iconfinder.com/data/icons/basic-7/97/34-512.png',
            name: 'Pablo',
            program: "SI",
        },
        {
            url: 'https://cdn0.iconfinder.com/data/icons/basic-7/97/34-512.png',
            name: 'Pedro',
            program: "CC",
        },
    ])
}