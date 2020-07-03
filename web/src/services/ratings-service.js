import { api } from './base-api'

function saveRating(appraiserCpf, appraiserPassword, working, process, pitch, innovation, team, teamId) {
    return api.post('/ratings', { teamId, appraiserCpf, appraiserPassword, working, process, pitch, innovation, team })
}

function deleteRating(id) {
    return api.delete(`/ratings/${id}`)
}

export const ratingsService = {
    saveRating, deleteRating
}