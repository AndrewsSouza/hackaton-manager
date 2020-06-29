export default class Appraiser {
    id: Number
    name: String
    cpf: String

    constructor(name: String, cpf: String, id: Number) {
        this.name = name
        this.cpf = cpf
        this.id = id
    }
}