import BaseResponseDto from "../../domains/dto/baseResponseDto";

export default interface RatingServiceFacade {
    saveRating(
        teamId: Number,
        appraiser: String,
        working: Number,
        process: Number,
        pitch: Number,
        innovation: Number,
        team: Number,
    ): BaseResponseDto
}