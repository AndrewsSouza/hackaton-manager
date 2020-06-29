export default class Student {
    id: Number
    url: String
    name: String
    program: String
    teamId?: Number
    teamMember?: boolean

    constructor(id: Number, url: String, name: String, program: String, teamMember: boolean = false, teamId: Number | undefined = undefined) {
        this.id = id
        this.url = url
        this.name = name
        this.program = program
        this.teamId = teamId
        this.teamMember = teamMember
    }
}