import api from './base-api'

const teams = []
let id = 0

function saveTeam(team) {
    // return api.post('/teams')

    team.id = id++

    teams.push(team)

    return Promise.resolve(team)
}

function editTeam(team) {
    // return api.put('/teams')
    const teamIndex = teams.findIndex(oldTeam => oldTeam.id === team.id)
    teams[teamIndex] = team

    return Promise.resolve()
}

function getTeams() {
    // return api.get('/teams')
    return Promise.resolve([...teams])
}

function removeTeam(id) {
    // return api.delete(`/teams/${id}`)
    teams.filter(team => team.id !== id)
    
    return Promise.resolve()
}

export const teamsService = {
    saveTeam,
    editTeam,
    getTeams,
    removeTeam,
}