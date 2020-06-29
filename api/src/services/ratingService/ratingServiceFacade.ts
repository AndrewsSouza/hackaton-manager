import BaseResponseDto from "../../domains/dto/baseResponseDto";

export default interface RatingServiceFacade {
    saveRating(
        teamId: Number,
        appraiserCPF: String,
        appraiserPassword: String,
        working: Number,
        process: Number,
        pitch: Number,
        innovation: Number,
        team: Number,
    ): Promise<BaseResponseDto>
}