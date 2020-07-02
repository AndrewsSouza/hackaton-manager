import Appraiser from "./appraiser"

export default class Rating {
    appraiser: Appraiser
    teamId: Number
    working: number
    process: number
    pitch: number
    innovation: number
    team: number
    id?: Number
    sum?: number

    constructor(
        appraiser: Appraiser,
        teamId: Number,
        working: number,
        process: number,
        pitch: number,
        innovation: number,
        team: number,
        id?: Number,
    ) {
        this.appraiser = appraiser
        this.teamId = teamId
        this.working = working
        this.process = process
        this.pitch = pitch
        this.innovation = innovation
        this.team = team
        this.id = id
    }
}