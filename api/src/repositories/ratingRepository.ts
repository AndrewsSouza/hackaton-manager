import TransactionSingleton from './transaction'
import Rating from '../domains/entities/rating'

export default class RatingRepository {
    private tableName = "ratings"

    constructor() {
        this.saveRating = this.saveRating.bind(this)
        this.deleteRating = this.deleteRating.bind(this)
        this.findByTeamId = this.findByTeamId.bind(this)
    }

    async saveRating(rating: Rating): Promise<void> {
        const trx = await TransactionSingleton.getInstance()
        delete rating.id

        await trx(this.tableName).insert({ ...rating })
    }

    async findByTeamId(teamId: Number): Promise<Rating[]> {
        const trx = await TransactionSingleton.getInstance()

        return await trx(this.tableName).where({ teamId })
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