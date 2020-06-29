import Knex from 'knex'

export async function seed(knex: Knex) {
    await knex('students').insert([
        {
            url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Crystal_Clear_kdm_user_female.svg/1200px-Crystal_Clear_kdm_user_female.svg.png',
            name: 'Aline',
            program: "ES",
        },
        {
            url: 'https://png.pngtree.com/element_our/png/20181206/users-vector-icon-png_260862.jpg',
            name: 'Douglas',
            program: "SI",
        },
        {
            url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Crystal_Clear_kdm_user_female.svg/1200px-Crystal_Clear_kdm_user_female.svg.png',
            name: 'Edna',
            program: "SI",
        },
        {
            url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Crystal_Clear_kdm_user_female.svg/1200px-Crystal_Clear_kdm_user_female.svg.png',
            name: 'Flavia',
            program: "CC",
        },
        {
            url: 'https://png.pngtree.com/element_our/png/20181206/users-vector-icon-png_260862.jpg',
            name: 'Gerson',
            program: "CC",
        },
        {
            url: 'https://png.pngtree.com/element_our/png/20181206/users-vector-icon-png_260862.jpg',
            name: 'Jorge',
            program: "ES",
        },
        {
            url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Crystal_Clear_kdm_user_female.svg/1200px-Crystal_Clear_kdm_user_female.svg.png',
            name: 'Maria',
            program: "CC",
        },
        {
            url: 'https://png.pngtree.com/element_our/png/20181206/users-vector-icon-png_260862.jpg',
            name: 'Pablo',
            program: "SI",
        },
        {
            url: 'https://png.pngtree.com/element_our/png/20181206/users-vector-icon-png_260862.jpg',
            name: 'Pedro',
            program: "CC",
        },
    ])
}