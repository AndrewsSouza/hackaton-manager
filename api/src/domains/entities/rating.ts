export default class Rating {
    appraiserId: Number
    teamId: Number
    working: Number
    process: Number
    pitch: Number
    innovation: Number
    team: Number
    id?: Number

    constructor(
        appraiserId: Number,
        teamId: Number,
        working: Number,
        process: Number,
        pitch: Number,
        innovation: Number,
        team: Number,
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