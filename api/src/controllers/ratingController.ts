import { Request, Response, NextFunction } from 'express'
import RatingService from '../services/ratingService/ratingService'
import RatingServiceFacade from '../services/ratingService/ratingServiceFacade'

export default class RatingController {
    ratingService: RatingServiceFacade

    constructor() {
        this.ratingService = new RatingService()
        this.saveRating = this.saveRating.bind(this)
    }

    saveRating(req: Request, res: Response, next: NextFunction): any {
        const { teamId, appraiser, working, process, pitch, innovation, team } = req.body

        const response = this.ratingService.saveRating(
            Number(teamId),
            appraiser,
            Number(working),
            Number(process),
            Number(pitch),
            Number(innovation),
            Number(team),
        )

        return res.send(response)
    }
}