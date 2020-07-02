import TransactionSingleton from './transaction'
import Appraiser from '../domains/entities/appraiser'
import BaseResponseDto from '../domains/dtos/baseResponseDto'
import { compare } from 'bcrypt'

export default class AppraiserRepository {
    private tableName = "appraisers"

    constructor() {
        this.findById = this.findById.bind(this)
        this.findByCpf = this.findByCpf.bind(this)
        this.isAppraiserValid = this.isAppraiserValid.bind(this)
    }

    async findById(id: Number): Promise<Appraiser> {
        const trx = await TransactionSingleton.getInstance()

        const appraiser = await trx(this.tableName).where({ id }).first()

        return appraiser
    }

    async findByCpf(cpf: String): Promise<Appraiser> {
        const trx = await TransactionSingleton.getInstance()

        const appraiser = await trx(this.tableName).where({ cpf }).first()

        return appraiser
    }

    async isAppraiserValid(cpf: String, password: String): Promise<BaseResponseDto> {
        const trx = await TransactionSingleton.getInstance()

        const { password: encodedPassword } = await trx(this.tableName).select('password').where({ cpf }).first()
        const result = await compare(password, encodedPassword)

        return result ? new BaseResponseDto() : new BaseResponseDto("Cpf ou código inválidos", false)
    }
}