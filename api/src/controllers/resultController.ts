import { Request, Response, NextFunction } from 'express'
import RatingService from '../services/ratingService/ratingService'
import RatingServiceFacade from '../services/ratingService/ratingServiceFacade'
import ResultServiceFacade from '../services/resultService/resultServiceFacade'
import ServiceFactory from '../services/serviceFactory'

export default class ResultController {
    resultService: ResultServiceFacade

    constructor() {
        this.resultService = ServiceFactory.getResultService()

        this.getResult = this.getResult.bind(this)
    }

    async getResult(req: Request, res: Response, next: NextFunction): Promise<any> {
        const response = await this.resultService.getResult()

        res.send(response)
        next()
    }
}