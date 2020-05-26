import { api } from './base-api'

function getParticipants() {
    return api.get('/students')
}


export const studentsService = {
    getParticipants,
}