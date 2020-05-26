const Team = require('../domains/entities/team')
const studentService = require('../services/studentService')
let teams = []
let id = 0

module.exports = {
    getAllTeams: () => {
        const teamsCopy = [...teams]

        return teamsCopy.map(team => {
            const studentsObjects = studentService.getByListId(team.students.map(s => s.id))
            team.students = studentsObjects
            return team
        })
    },
    saveTeam: (team) => {
        result = studentService.verifyMembers(team.students)
        if (result.success) {
            team.id = id++
            teams.push(team)

            studentService.joinMembers(team.students)

            team.students = studentService.getByListId(team.students)
            result.team = team
        }

        return result
    },
    updateTeam: (id, students, name) => {
        const team = teams.find(t => t.id == id)
        if (!!team) {
            const removedStudents = team.students.filter(s => !students.includes(s.id))

            if (removedStudents.length > 0) {
                studentService.disjoinMembers(removedStudents.map(s => s.id))
            }
            studentService.joinMembers(students)

            team.students = studentService.getByListId(students)
            team.name = name
            return { success: true, message: '', team }
        }
        return { success: false, message: 'Nenhum time com esse identificador foi encontrado' }
    },
    removeTeam: (id) => {
        const team = teams.find(t => Number(t.id) === Number(id))

        if (!!team) {
            teams = teams.filter(t => Number(t.id) !== Number(id))
            studentService.disjoinMembers(team.students.map(s => s.id))

            return { success: true, message: '' }
        }
        return { success: false, message: 'Nenhum time com esse identificador foi encontrado' }
    },
    addRating: (teamId, rating) => {
        const team = teams.find(t => t.id == teamId)
        if (team) {
            team.ratings.push(rating)

            return { success: true, message: '' }
        }

        return { success: false, message: 'Nenhum time com esse identificador foi encontrado' }
    }
}