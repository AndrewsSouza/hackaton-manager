import { api } from './base-api'

function saveRating(appraiser, working, process, pitch, innovation, team, teamId) {
    return api.post('/ratings', { teamId, appraiser, working, process, pitch, innovation, team })
    // return Promise.resolve()
}

export const ratingsService = {
    saveRating,
}