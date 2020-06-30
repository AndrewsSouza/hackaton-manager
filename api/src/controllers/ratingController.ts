import { Request, Response, NextFunction } from 'express'
import RatingService from '../services/ratingService/ratingService'
import RatingServiceFacade from '../services/ratingService/ratingServiceFacade'
import ServiceFactory from '../services/serviceFactory'

export default class RatingController {
    ratingService: RatingServiceFacade

    constructor() {
        this.ratingService = ServiceFactory.getRatingService()
        
        this.saveRating = this.saveRating.bind(this)
        this.deleteRating = this.deleteRating.bind(this)
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

    async deleteRating(req: Request, res: Response, next: NextFunction): Promise<any> {
        const { id } = req.params

        const response = await this.ratingService.deleteRating(Number(id))

        res.send(response)
        next()
    }
}