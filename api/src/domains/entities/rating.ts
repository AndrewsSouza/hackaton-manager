export default class Rating {
    appraiser: String
    working: Number
    process: Number
    pitch: Number
    innovation: Number
    team: Number

    constructor(appraiser: String, working: Number, process: Number, pitch: Number, innovation: Number, team: Number) {
        this.appraiser = appraiser
        this.working = working
        this.process = process
        this.pitch = pitch
        this.innovation = innovation
        this.team = team
    }
}