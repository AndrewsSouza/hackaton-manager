import TeamService from "../teamService/teamService";
import Rating from "../../domains/entities/rating";
import RatingServiceFacade from "./ratingServiceFacade";
import BaseResponseDto from "../../domains/dto/baseResponseDto";
import TeamServiceFacade from "../teamService/teamServiceFacade";

export default class RatingService implements RatingServiceFacade {
    teamService: TeamServiceFacade

    constructor() {
        this.teamService = new TeamService()
        this.saveRating = this.saveRating.bind(this)
    }

    saveRating(
        teamId: Number,
        appraiser: String,
        working: Number,
        process: Number,
        pitch: Number,
        innovation: Number,
        team: Number,
    ): BaseResponseDto {
        const rating = new Rating(appraiser, working, process, pitch, innovation, team)
        this.teamService.addRating(teamId, rating)

        return new BaseResponseDto("Avaliação enviada com sucesso")
    }
}