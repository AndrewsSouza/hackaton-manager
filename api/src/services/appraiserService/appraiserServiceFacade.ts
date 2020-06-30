import BaseResponseDto from "../../domains/dtos/baseResponseDto";
import Appraiser from "../../domains/entities/appraiser";

export default interface AppraiserServiceFacade {
    findByCpf(cpf: String): Promise<Appraiser>
    
    isAppraiserValid(cpf: String, password: String): Promise<BaseResponseDto>
}