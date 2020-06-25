import Student from "./student"
import Rating from "./rating"

export default class Team {
    students: Student[]
    name: String
    ratings: Rating[]
    id: Number
    constructor(students: Student[], name: String) {
        this.students = students
        this.name = name
        this.ratings = []
    }
}