export default class Rating {
    appraiserId: Number
    teamId: Number
    working: number
    process: number
    pitch: number
    innovation: number
    team: number
    id?: Number
    sum?: number

    constructor(
        appraiserId: Number,
        teamId: Number,
        working: number,
        process: number,
        pitch: number,
        innovation: number,
        team: number,
        id?: Number,
    ) {
        this.appraiserId = appraiserId
        this.teamId = teamId
        this.working = working
        this.process = process
        this.pitch = pitch
        this.innovation = innovation
        this.team = team
        this.id = id
    }
}