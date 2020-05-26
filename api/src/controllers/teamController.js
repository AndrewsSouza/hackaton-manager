const teamService = require('../services/teamService')

module.exports = {
    getAllTeams(req, res, next) {
        const teams = teamService.getAllTeams()
        return res.json(teams)
    },
    saveTeam: (req, res, next) => {
        const { students, name } = req.body

        const result = teamService.saveTeam(students, name)
        return res.send({ ...result })
    },
    updateTeam: (req, res, next) => {
        const { id, students, name } = req.body

        const result = teamService.updateTeam(id, students, name)
        return res.send({ ...result })
    },
    removeTeam: (req, res, next) => {
        const { id } = req.params
        const result = teamService.removeTeam(id)

        return res.send({ ...result })
    }
}