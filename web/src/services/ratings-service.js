import { api } from './base-api'

function saveRating(appraiserCpf, appraiserPassword, working, process, pitch, innovation, team, teamId) {
    return api.post('/ratings', { teamId, appraiserCpf, appraiserPassword, working, process, pitch, innovation, team })
    // return Promise.resolve()
}

export const ratingsService = {
    saveRating,
}