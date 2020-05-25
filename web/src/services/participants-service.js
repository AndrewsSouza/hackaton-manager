import api from './base-api'

let id = 0
const participantsMock = [
    {
        id: id++,
        name: "Andrews Souza",
        imageUrl: "https://picsum.photos/100",
    },
    {
        id: id++,
        name: "Andrews Souza",
        imageUrl: "https://picsum.photos/100",
    },
    {
        id: id++,
        name: "Andrews Souza",
        imageUrl: "https://picsum.photos/100",
    },
    {
        id: id++,
        name: "Andrews Souza",
        imageUrl: "https://picsum.photos/100",
    },
    {
        id: id++,
        name: "Andrews Souza",
        imageUrl: "https://picsum.photos/100",
    },
    {
        id: id++,
        name: "Andrews Souza",
        imageUrl: "https://picsum.photos/100",
    },
    {
        id: id++,
        name: "Andrews Souza",
        imageUrl: "https://picsum.photos/100",
    },
    {
        id: id++,
        name: "Andrews Souza",
        imageUrl: "https://picsum.photos/100",
    },
    {
        id: id++,
        name: "Andrews Souza",
        imageUrl: "https://picsum.photos/100",
    },
    {
        id: id++,
        name: "Andrews Souza",
        imageUrl: "https://picsum.photos/100",
    },
    {
        id: id++,
        name: "Andrews Souza",
        imageUrl: "https://picsum.photos/100",
    },
    {
        id: id++,
        name: "Andrews Souza",
        imageUrl: "https://picsum.photos/100",
    },
    {
        id: id++,
        name: "Andrews Souza",
        imageUrl: "https://picsum.photos/100",
    },
    {
        id: id++,
        name: "Andrews Souza",
        imageUrl: "https://picsum.photos/100",
    },
]

function getParticipants() {
    //return  api.get('/students')
    return Promise.resolve(participantsMock)
}


export const participantsService = {
    getParticipants,
}