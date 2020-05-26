const teamRepository = require('../repositories/teamRepository')
const Team = require('../domains/entities/team')

module.exports = {
    getAllTeams: () => {

        return teamRepository.getAllTeams()
    },
    saveTeam: (students, name) => {

        return teamRepository.saveTeam(new Team(students, name))
    },
    updateTeam: (id, students, name) => {

        return teamRepository.updateTeam(id, students, name)
    },
    removeTeam: (id) => {
        teamRepository.removeTeam(id)
        return { success: true, message: '' }
    },
    addRating: (teamId, rating) => {

        teamRepository.addRating(teamId, rating)
        return { success: true, message: '' }
    }
}