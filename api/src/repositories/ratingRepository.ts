import TransactionSingleton from './transaction'
import Rating from '../domains/entities/rating'

export default class RatingRepository {
    private tableName = "ratings"

    constructor() {
        this.saveRating = this.saveRating.bind(this)
        this.deleteRating = this.deleteRating.bind(this)
    }

    async saveRating(rating: Rating): Promise<void> {
        const trx = await TransactionSingleton.getInstance()
        delete rating.id

        await trx(this.tableName).insert({ ...rating })
    }

    async deleteRating(ratingId: Number): Promise<any> {
        const trx = await TransactionSingleton.getInstance()

        await trx(this.tableName).del().where('id', ratingId)
    }

    async findByTeamIdAndAppraiserId(teamId: Number, appraiserId: Number): Promise<Rating> {
        const trx = await TransactionSingleton.getInstance()
        const rating = await trx(this.tableName).where({ teamId, appraiserId }).first()

        return rating
    }
}