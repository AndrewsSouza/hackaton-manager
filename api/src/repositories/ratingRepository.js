const teamService = require('../services/teamService')
let teams = []

module.exports = {
    saveRating: (teamId, rating) => {
        return teamService.addRating(teamId, rating)
    }
}