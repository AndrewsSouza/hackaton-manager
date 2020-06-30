import { Request, Response, NextFunction } from 'express'
import StudentService from '../services/studentService/studentService'
import StudentServiceFacade from '../services/studentService/studentServiceFacade'
import ServiceFactory from '../services/serviceFactory'

export default class StudentController {
    studentService: StudentServiceFacade

    constructor() {
        this.studentService = ServiceFactory.getStudentService()

        this.getAllStudents = this.getAllStudents.bind(this)
        this.saveStudent = this.saveStudent.bind(this)
    }

    async getAllStudents(req: Request, res: Response, next: NextFunction): Promise<any> {
        const students = await this.studentService.getAllStudents()

        res.json(students)
        next()
    }

    async saveStudent(req: Request, res: Response, next: NextFunction): Promise<any> {
        const { name, program } = req.body
        const response = await this.studentService.saveStudent(name, program)

        res.send(response)
        next()
    }
}