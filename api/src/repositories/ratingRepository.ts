import TransactionSingleton from './transaction'
import Rating from '../domains/entities/rating'
import Appraiser from '../domains/entities/appraiser'

export default class RatingRepository {
    private tableName = "ratings"

    constructor() {
        this.saveRating = this.saveRating.bind(this)
        this.deleteRating = this.deleteRating.bind(this)
        this.findByTeamId = this.findByTeamId.bind(this)
    }

    async saveRating(appraiserId: Number, teamId: Number, working: number, process: number, pitch: number, innovation: number, team: number): Promise<void> {
        const trx = await TransactionSingleton.getInstance()

        await trx(this.tableName).insert({ appraiserId, teamId, working, process, pitch, innovation, team })
    }

    async findByTeamId(teamId: Number): Promise<Rating[]> {
        const trx = await TransactionSingleton.getInstance()

        const query =
            `SELECT ${this.tableName}.*, appraisers.name as appraiserName, appraisers.cpf as appraiserCpf 
        FROM ${this.tableName} INNER JOIN appraisers ON 
        ${this.tableName}.appraiserId = appraisers.id 
        where ${this.tableName}.teamId = ${teamId}`

        let result: any[] = await trx.raw(query)

        return result.map((queryResult: any) => {
            const appraiser = new Appraiser(queryResult.appraiserName, queryResult.appraiserCpf, queryResult.appraiserId)
            const rating = new Rating(
                appraiser,
                teamId,
                queryResult.working,
                queryResult.process,
                queryResult.pitch,
                queryResult.innovation,
                queryResult.team,
                queryResult.id
            )

            return rating
        })
    }

    async deleteRating(ratingId: Number): Promise<any> {
        const trx = await TransactionSingleton.getInstance()

        await trx(this.tableName).del().where('id', ratingId)
    }

    async countByTeamId(teamId: Number): Promise<Number> {
        const trx = await TransactionSingleton.getInstance()
        const [{ count }] = await trx(this.tableName).count('id as count').where({ teamId })

        return Number(count)
    }

    async findByTeamIdAndAppraiserId(teamId: Number, appraiserId: Number): Promise<Rating> {
        const trx = await TransactionSingleton.getInstance()
        const rating = await trx(this.tableName).where({ teamId, appraiserId }).first()

        return rating
    }

    async getQualifiedTeamsId(): Promise<Number[]> {
        const trx = await TransactionSingleton.getInstance()
        const minMaxRatings = 3

        const countArray = await trx(this.tableName).select('teamId').count('id as count').groupBy('teamId').having('count', '=', minMaxRatings)
        const teamsId = countArray.map(({ teamId }) => Number(teamId))

        return teamsId
    }
}