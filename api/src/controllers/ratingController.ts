import { Request, Response, NextFunction } from 'express'
import RatingService from '../services/ratingService/ratingService'
import RatingServiceFacade from '../services/ratingService/ratingServiceFacade'

export default class RatingController {
    ratingService: RatingServiceFacade

    constructor() {
        this.ratingService = new RatingService()
        this.saveRating = this.saveRating.bind(this)
    }

    async saveRating(req: Request, res: Response, next: NextFunction): Promise<any> {
        const { teamId, appraiserCpf, appraiserPassword, working, process, pitch, innovation, team } = req.body

        const response = await this.ratingService.saveRating(
            Number(teamId),
            appraiserCpf,
            appraiserPassword,
            Number(working),
            Number(process),
            Number(pitch),
            Number(innovation),
            Number(team),
        )

        res.send(response)
        next()
    }
}