import Rating from "../../domains/entities/rating";
import RatingServiceFacade from "./ratingServiceFacade";
import BaseResponseDto from "../../domains/dto/baseResponseDto";
import RatingRepository from "../../repositories/ratingRepository";
import AppraiserServiceFacade from "../appraiserService/appraiserServiceFacade";
import AppraiserService from "../appraiserService/appraiserService";
import TeamServiceFacade from "../teamService/teamServiceFacade";
import TeamService from "../teamService/teamService";

export default class RatingService implements RatingServiceFacade {
    ratingRepository: RatingRepository
    appraiserService: AppraiserServiceFacade
    teamService: TeamServiceFacade

    constructor() {
        this.ratingRepository = new RatingRepository()
        this.appraiserService = new AppraiserService()
        this.teamService = new TeamService()
        this.saveRating = this.saveRating.bind(this)
    }

    private async findByTeamIdAndAppraiserId(teamId: Number, appraiserId: Number): Promise<Rating> {
        return await this.ratingRepository.findByTeamIdAndAppraiserId(teamId, appraiserId)
    }

    async saveRating(
        teamId: Number,
        appraiserCPF: String,
        appraiserPassword: String,
        working: Number,
        process: Number,
        pitch: Number,
        innovation: Number,
        team: Number,
    ): Promise<BaseResponseDto> {
        const appraiser = await this.appraiserService.findByCpf(appraiserCPF)

        if (!appraiser) {
            return new BaseResponseDto("Avaliador não existe", false)
        }

        const existingTeam = await this.teamService.findById(teamId)

        if (!existingTeam) {
            return new BaseResponseDto("Time não encontrado", false)
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

        await this.ratingRepository.saveRating(rating)
        return new BaseResponseDto("Avaliação enviada com sucesso")
    }
}