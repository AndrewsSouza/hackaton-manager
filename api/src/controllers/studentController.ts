import { Request, Response, NextFunction } from 'express'
import StudentService from '../services/studentService/studentService'
import StudentServiceFacade from '../services/studentService/studentServiceFacade'

export default class StudentController {
    studentService: StudentServiceFacade

    constructor() {
        this.studentService = new StudentService()
        this.getAllStudents = this.getAllStudents.bind(this)
    }

    getAllStudents(req: Request, res: Response, next: NextFunction): any {
    const students = this.studentService.getAllStudents()

    return res.json(students)
}
}