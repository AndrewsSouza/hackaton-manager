import Appraiser from "../../domains/entities/appraiser";
import AppraiserServiceFacade from "./appraiserServiceFacade";
import AppraiserRepository from '../../repositories/appraiserRepository'
import BaseResponseDto from "../../domains/dtos/baseResponseDto";

export default class AppraiserService implements AppraiserServiceFacade {
    appraiserRepository: AppraiserRepository

    constructor() {
        this.appraiserRepository = new AppraiserRepository()

        this.findById = this.findById.bind(this)
        this.findByCpf = this.findByCpf.bind(this)
        this.isAppraiserValid = this.isAppraiserValid.bind(this)
    }

    async findById(id: Number): Promise<Appraiser> {
        return await this.appraiserRepository.findById(id)
    }

    async findByCpf(cpf: String): Promise<Appraiser> {
        return await this.appraiserRepository.findByCpf(cpf)
    }

    async isAppraiserValid(cpf: String, password: String): Promise<BaseResponseDto> {
        return await this.appraiserRepository.isAppraiserValid(cpf, password)
    }

}