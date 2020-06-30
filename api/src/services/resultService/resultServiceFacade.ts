import BaseResponseDto from "../../domains/dtos/baseResponseDto";

export default interface ResultServiceFacade {
    getResult(): Promise<BaseResponseDto>
}