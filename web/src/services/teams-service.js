import { api } from './base-api'

function saveTeam(students, name) {
    const studentsId = students.map(s => s.id)
    return api.post('/teams', { students: studentsId, name })
}

function editTeam(students, name, id) {
    const studentsId = students.map(s => s.id)
    return api.put('/teams', { students: studentsId, name, id })
}

function getTeams() {
    return api.get('/teams')
}

function removeTeam(id) {
    return api.delete(`/teams/${id}`)
}

export const teamsService = {
    saveTeam,
    editTeam,
    getTeams,
    removeTeam,
}