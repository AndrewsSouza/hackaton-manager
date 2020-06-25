import Student from "../domains/entities/student"

let id = 0

const defaultStudents = [
    new Student(++id, 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Crystal_Clear_kdm_user_female.svg/1200px-Crystal_Clear_kdm_user_female.svg.png', 'Aline', 'ES'),
    new Student(++id, 'https://png.pngtree.com/element_our/png/20181206/users-vector-icon-png_260862.jpg', 'Douglas', 'SI'),
    new Student(++id, 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Crystal_Clear_kdm_user_female.svg/1200px-Crystal_Clear_kdm_user_female.svg.png', 'Edna', 'SI'),
    new Student(++id, 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Crystal_Clear_kdm_user_female.svg/1200px-Crystal_Clear_kdm_user_female.svg.png', 'Flávia', 'CC'),
    new Student(++id, 'https://png.pngtree.com/element_our/png/20181206/users-vector-icon-png_260862.jpg', 'Gerson', 'CC'),
    new Student(++id, 'https://png.pngtree.com/element_our/png/20181206/users-vector-icon-png_260862.jpg', 'Jorge', 'ES'),
    new Student(++id, 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Crystal_Clear_kdm_user_female.svg/1200px-Crystal_Clear_kdm_user_female.svg.png', 'Maria', 'ES'),
    new Student(++id, 'https://png.pngtree.com/element_our/png/20181206/users-vector-icon-png_260862.jpg', 'Pablo', 'SI'),
    new Student(++id, 'https://png.pngtree.com/element_our/png/20181206/users-vector-icon-png_260862.jpg', 'Pedro', 'CC')
]

export default class StudentRepository {
    students: Student[]
    
    constructor() {
        this.students = defaultStudents
        this.getAllStudents = this.getAllStudents.bind(this)
        this.getByListId = this.getByListId.bind(this)
        this.updateStudent = this.updateStudent.bind(this)
    }
    getAllStudents(): Student[] {
        return this.students
    }

    getByListId(studentsId: Number[]): Student[] {
        return this.students.filter((student: Student) => studentsId.includes(student.id))
    }

    updateStudent(student: Student): void {
        const index = this.students.findIndex((std: Student) => std.id === student.id)
        this.students[index] = student
    }
}
