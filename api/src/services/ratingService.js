const Rating = require('../domains/entities/rating')
const ratingRepository = require('../repositories/ratingRepository')

module.exports = {
    saveRating: (teamId, appraiser, working, process, pitch, innovation, team) => {

        return ratingRepository.saveRating(teamId, new Rating(appraiser, working, process, pitch, innovation, team))
    }
}