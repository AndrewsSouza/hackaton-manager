export default class BaseResponseDto {
    success: boolean
    message: String
    [key: string]: any

    constructor(message: String = "", success: boolean = true) {
        this.success = success
        this.message = message
    }
}