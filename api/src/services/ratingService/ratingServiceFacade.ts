import BaseResponseDto from "../../domains/dtos/baseResponseDto";
import Rating from "../../domains/entities/rating";

export default interface RatingServiceFacade {
    saveRating(
        teamId: Number,
        appraiserCPF: String,
        appraiserPassword: String,
        working: number,
        process: number,
        pitch: number,
        innovation: number,
        team: number,
    ): Promise<BaseResponseDto>

    findByTeamId(teamId: Number): Promise<Rating[]>

    deleteRating(id: Number): Promise<BaseResponseDto>

    getQualifiedTeamsId(): Promise<Number[]>
}