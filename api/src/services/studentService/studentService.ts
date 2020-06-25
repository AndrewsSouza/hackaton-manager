import StudentServiceFacade from './studentServiceFacade'
import Student from '../../domains/entities/student';
import StudentRepository from '../../repositories/studentRepository';

export default class StudentService implements StudentServiceFacade {
    studentRepository: StudentRepository
    
    constructor() {
        this.studentRepository = new StudentRepository()
        this.getAllStudents = this.getAllStudents.bind(this)
        this.hasDifferentPrograms = this.hasDifferentPrograms.bind(this)
        this.hasStudentTwice = this.hasStudentTwice.bind(this)
        this.verifyMembers = this.verifyMembers.bind(this)
        this.joinMembers = this.joinMembers.bind(this)
        this.disjoinMembers = this.disjoinMembers.bind(this)
        this.getByListId = this.getByListId.bind(this)
    }

    getAllStudents(): Student[] {
        return this.studentRepository.getAllStudents()
    }

    private hasDifferentPrograms(students: Student[]): boolean {
        let firstStudent = students[0]

        students.forEach((student: Student, index) => {

            if (index !== 0 && student.program != firstStudent.program) {
                return true
            }
        })

        return false
    }

    private hasStudentTwice(students: Student[], student: Student, studentIndex: Number): boolean {
        students.forEach((st, index) => {
            if (studentIndex !== index && st.id === student.id) {
                return true
            }
        })

        return false
    }

    verifyMembers(studentsId: Number[]): any {
        const students = this.studentRepository.getByListId(studentsId)

        let hasSameStudentTwice = false
        let hasSomeMemberWithTeam = false

        students.forEach((student, studentIndex) => {
            if (student.teamMember) {
                hasSomeMemberWithTeam = student.teamMember
                return
            }
            hasSameStudentTwice = this.hasStudentTwice(students, student, studentIndex)
        })

        if (hasSomeMemberWithTeam)
            return { success: false, message: 'Algum dos membros já faz parte de um time' }

        else if (!this.hasDifferentPrograms(students))
            return { success: false, message: 'Para formar um time, é necessário que haja integrantes de pelo menos 2 cursos diferentes' }

        else if (hasSameStudentTwice) {
            return { success: false, message: 'Não pode haver um(a) estudante duas vezes no mesmo time' }

        } else
            return { success: true, message: '' }
    }

    joinMembers(studentsId: Number[]): void {
        const students = this.studentRepository.getByListId(studentsId)

        students.forEach(student => {
            student.teamMember = true
            this.studentRepository.updateStudent(student)
        })
    }

    disjoinMembers(studentsId: Number[]) {
        const students = this.studentRepository.getByListId(studentsId)

        students.forEach(student => {
            student.teamMember = false
            this.studentRepository.updateStudent(student)
        })
    }

    getByListId(studentsId: Number[]) {
        return this.studentRepository.getByListId(studentsId)
    }

}