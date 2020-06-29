import Team from '../domains/entities/team'
import knex from '../database/connection'
import TransactionSingleton from './transaction'

export default class TeamRepository {
    private tableName = "teams"

    constructor() {
        this.getAllTeams = this.getAllTeams.bind(this)
        this.saveTeam = this.saveTeam.bind(this)
        this.findById = this.findById.bind(this)
        this.updateTeam = this.updateTeam.bind(this)
        this.removeTeam = this.removeTeam.bind(this)
    }

    async getAllTeams(): Promise<Team[]> {
        return await knex(this.tableName)
    }

    async saveTeam(teamName: String): Promise<Number> {
        const trx = await TransactionSingleton.getInstance()

        const insertedIds = await trx(this.tableName).insert({ name: teamName })

        return insertedIds[0]
    }

    async findById(teamId: Number): Promise<any> {
        return await knex(this.tableName).where('id', teamId).first()
    }

    async updateTeam(teamId: Number, name: String): Promise<void> {
        const trx = await TransactionSingleton.getInstance()
        await trx(this.tableName).update({ id: teamId, name })
    }

    async removeTeam(teamId: Number): Promise<void> {
        const trx = await TransactionSingleton.getInstance()

        await trx(this.tableName).where('id', teamId).del()
    }
}