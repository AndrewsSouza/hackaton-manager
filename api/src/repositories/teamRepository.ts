import Team from '../domains/entities/team'
let id = 0

export default class TeamRepository {
    teams: Team[]

    constructor() {
        this.teams = []
        this.getAllTeams = this.getAllTeams.bind(this)
        this.saveTeam = this.saveTeam.bind(this)
        this.findById = this.findById.bind(this)
        this.updateTeam = this.updateTeam.bind(this)
        this.removeTeam = this.removeTeam.bind(this)
    }
    getAllTeams(): Team[] {
        return [...this.teams]
    }

    saveTeam(team: Team): void {
        team.id = id++
        this.teams.push(team)
    }

    findById(teamId: Number): Team | undefined {
        return this.teams.find(t => t.id === teamId)
    }

    updateTeam(team: Team): void {
        const index = this.teams.findIndex(t => t.id === team.id)
        this.teams[index] = team
    }

    removeTeam(teamId: Number): void {
        this.teams = this.teams.filter(t => Number(t.id) !== Number(teamId))
    }
}