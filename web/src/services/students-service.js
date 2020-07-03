import { api } from './base-api'

function getParticipants() {
    return api.get('/students')
}

function saveStudent(name, program){
    return api.post('/students', {name, program})
}


export const studentsService = {
    getParticipants,
    saveStudent
}