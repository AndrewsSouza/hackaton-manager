import { api } from './base-api'

function getResult() {
    return api.get('/result')
}

export const resultService = {
    getResult
}