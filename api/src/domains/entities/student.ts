export default class Student {
    id: Number
    url: String
    name: String
    program: String
    teamMember?: boolean

    constructor(id: Number, url: String, name: String, program: String, teamMember: boolean = false) {
        this.id = id
        this.url = url
        this.name = name
        this.program = program
        this.teamMember = teamMember
    }
}