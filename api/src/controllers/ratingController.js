const ratingService = require('../services/ratingService')

module.exports = {
    saveRating: (req, res, next) => {
        const { teamId, appraiser, working, process, pitch, innovation, team} = req.body

        result = ratingService.saveRating(teamId, appraiser, working, process, pitch, innovation, team)
        return res.send({ success: result.success, message: result.message })
    }
}