import Student from "../domains/entities/student"
import knex from '../database/connection'
import { Transaction, QueryBuilder } from "knex"
import TransactionSingleton from "./transaction"

let id = 0

const defaultStudents = [
    new Student(++id, 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Crystal_Clear_kdm_user_female.svg/1200px-Crystal_Clear_kdm_user_female.svg.png', 'Aline', 'ES'),
    new Student(++id, 'https://png.pngtree.com/element_our/png/20181206/users-vector-icon-png_260862.jpg', 'Douglas', 'SI'),
    new Student(++id, 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Crystal_Clear_kdm_user_female.svg/1200px-Crystal_Clear_kdm_user_female.svg.png', 'Edna', 'SI'),
    new Student(++id, 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Crystal_Clear_kdm_user_female.svg/1200px-Crystal_Clear_kdm_user_female.svg.png', 'Flávia', 'CC'),
    new Student(++id, 'https://png.pngtree.com/element_our/png/20181206/users-vector-icon-png_260862.jpg', 'Gerson', 'CC'),
    new Student(++id, 'https://png.pngtree.com/element_our/png/20181206/users-vector-icon-png_260862.jpg', 'Jorge', 'ES'),
    new Student(++id, 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Crystal_Clear_kdm_user_female.svg/1200px-Crystal_Clear_kdm_user_female.svg.png', 'Maria', 'ES'),
    new Student(++id, 'https://png.pngtree.com/element_our/png/20181206/users-vector-icon-png_260862.jpg', 'Pablo', 'SI'),
    new Student(++id, 'https://png.pngtree.com/element_our/png/20181206/users-vector-icon-png_260862.jpg', 'Pedro', 'CC')
]

export default class StudentRepository {
    students: Student[]
    private tableName = "students"

    constructor() {
        this.students = defaultStudents
        this.getAllStudents = this.getAllStudents.bind(this)
        this.getByListId = this.getByListId.bind(this)
        this.getByTeam = this.getByTeam.bind(this)
        this.updateStudent = this.updateStudent.bind(this)
    }
    async getAllStudents(): Promise<Student[]> {
        return await knex(this.tableName)
    }

    async getByListId(studentsId: Number[]): Promise<Student[]> {
        return await knex(this.tableName).whereIn("id", studentsId)
    }

    async getByTeam(teamId: Number): Promise<Student[]> {
        return await knex(this.tableName).where("teamId", teamId)
    }

    updateStudent(student: Student): void {
        const index = this.students.findIndex((std: Student) => std.id === student.id)
        this.students[index] = student
    }

    async joinMembers(studentsId: Number[], teamId: Number): Promise<void> {
        const trx = await TransactionSingleton.getInstance()

        const updateQueries = studentsId.map(id => {
            const query = `UPDATE ${this.tableName} SET teamId = ${teamId}, teamMember = 1 WHERE id = ${id};`
            return trx.raw(query)
        })

        await Promise.all(updateQueries)
    }

    async disjoinMembersById(studentsId: Number[]): Promise<void> {
        const trx = await TransactionSingleton.getInstance()

        const updateQueries = studentsId.map(id => {
            const query = `UPDATE ${this.tableName} SET teamId = null, teamMember = 0 WHERE id = ${id};`
            return trx.raw(query)
        })

        await Promise.all(updateQueries)
    }

    async disjoinMembersByTeamId(teamId: Number): Promise<void> {
        const trx = await TransactionSingleton.getInstance()

        const query = `UPDATE ${this.tableName} SET teamId = null, teamMember = 0 WHERE teamId = ${teamId};`
        await trx.raw(query)
    }
}
