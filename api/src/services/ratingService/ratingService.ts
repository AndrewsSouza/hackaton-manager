import Rating from "../../domains/entities/rating";
import RatingServiceFacade from "./ratingServiceFacade";
import BaseResponseDto from "../../domains/dtos/baseResponseDto";
import RatingRepository from "../../repositories/ratingRepository";
import AppraiserServiceFacade from "../appraiserService/appraiserServiceFacade";
import ServiceFactory from "../serviceFactory";

export default class RatingService implements RatingServiceFacade {
    ratingRepository: RatingRepository
    appraiserService: AppraiserServiceFacade

    LIMIT_OF_RATINGS = 3

    constructor() {
        this.ratingRepository = new RatingRepository()
        this.appraiserService = ServiceFactory.getAppraiserService()
        
        this.saveRating = this.saveRating.bind(this)
        this.deleteRating = this.deleteRating.bind(this)
        this.findByTeamId = this.findByTeamId.bind(this)
        this.getQualifiedTeamsId = this.getQualifiedTeamsId.bind(this)
    }

    private async findByTeamIdAndAppraiserId(teamId: Number, appraiserId: Number): Promise<Rating> {
        return await this.ratingRepository.findByTeamIdAndAppraiserId(teamId, appraiserId)
    }

    async saveRating(
        teamId: Number,
        appraiserCPF: String,
        appraiserPassword: String,
        working: number,
        process: number,
        pitch: number,
        innovation: number,
        team: number,
    ): Promise<BaseResponseDto> {
        const numberOfRatingsForTheTeam = await this.ratingRepository.countByTeamId(teamId)

        if (numberOfRatingsForTheTeam === 3) {
            return new BaseResponseDto("Este time já possui 3 avaliações", false)
        }

        const appraiser = await this.appraiserService.findByCpf(appraiserCPF)

        if (!appraiser) {
            return new BaseResponseDto("Avaliador não existe", false)
        }

        const existingRating = await this.findByTeamIdAndAppraiserId(teamId, appraiser.id)

        if (!!existingRating) {
            return new BaseResponseDto("Um time só pode ser avaliado uma vez por um mesmo avaliador.", false)
        }

        const isAppraiserValidResponse: BaseResponseDto = await this.appraiserService.isAppraiserValid(appraiserCPF, appraiserPassword)

        if (!isAppraiserValidResponse.success) {
            return isAppraiserValidResponse
        }

        const rating = new Rating(appraiser.id, teamId, working, process, pitch, innovation, team)

        try {
            await this.ratingRepository.saveRating(rating)
            return new BaseResponseDto("Avaliação enviada com sucesso")
        } catch (err) {
            const response = new BaseResponseDto("Não foi possível enviar a avaliação", false)
            response.err = err

            return response
        }
    }

    async findByTeamId(teamId: Number): Promise<Rating[]> {
        return await this.ratingRepository.findByTeamId(teamId)
    }

    async deleteRating(id: Number): Promise<BaseResponseDto> {
        try {
            await this.ratingRepository.deleteRating(id)
            return new BaseResponseDto("Avaliação excluída com sucesso")
        } catch (err) {
            const response = new BaseResponseDto("Não foi possível excluir esta avaliação", false)
            response.err = err

            return response
        }
    }

    async getQualifiedTeamsId(): Promise<Number[]> {
        return await this.ratingRepository.getQualifiedTeamsId()
    }
}