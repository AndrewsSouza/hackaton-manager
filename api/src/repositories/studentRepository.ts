import Student from "../domains/entities/student"
import knex from '../database/connection'
import TransactionSingleton from "./transaction"
import { StudentPrograms } from "../domains/enums/studentPrograms"

export default class StudentRepository {
    private tableName = "students"

    constructor() {
        this.getAllStudents = this.getAllStudents.bind(this)
        this.getByListId = this.getByListId.bind(this)
        this.getByTeam = this.getByTeam.bind(this)
    }
    async getAllStudents(): Promise<Student[]> {
        return await knex(this.tableName)
    }

    async findById(id: Number): Promise<Student> {
        const trx = await TransactionSingleton.getInstance()

        return await trx(this.tableName).where({id}).first()
    }

    async getByListId(studentsId: Number[]): Promise<Student[]> {
        return await knex(this.tableName).whereIn("id", studentsId)
    }

    async getByTeam(teamId: Number): Promise<Student[]> {
        return await knex(this.tableName).where("teamId", teamId)
    }

    async saveStudent(name: String, program: StudentPrograms): Promise<Number> {
        const trx = await TransactionSingleton.getInstance()
        const [id] = await trx(this.tableName).insert({ name, program })
        return id
    }

    async removeStudent(id: Number): Promise<void> {
        const trx = await TransactionSingleton.getInstance()
        await trx(this.tableName).del().where({ id })
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
