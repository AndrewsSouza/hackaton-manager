import Appraiser from "../../domains/entities/appraiser";
import AppraiserServiceFacade from "./appraiserServiceFacade";
import AppraiserRepository from '../../repositories/appraiserRepository'
import BaseResponseDto from "../../domains/dtos/baseResponseDto";

export default class AppraiserService implements AppraiserServiceFacade {
    appraiserRepository: AppraiserRepository
    
    constructor() {
        this.appraiserRepository = new AppraiserRepository()
    }

    async findByCpf(cpf: String): Promise<Appraiser> {
        return await this.appraiserRepository.findByCpf(cpf)
    }
    async isAppraiserValid(cpf: String, password: String): Promise<BaseResponseDto> {
        return await this.appraiserRepository.isAppraiserValid(cpf, password)
    }

}