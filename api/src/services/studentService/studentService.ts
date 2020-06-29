import StudentServiceFacade from './studentServiceFacade'
import Student from '../../domains/entities/student';
import StudentRepository from '../../repositories/studentRepository';
import BaseResponseDto from '../../domains/dto/baseResponseDto';

export default class StudentService implements StudentServiceFacade {
    studentRepository: StudentRepository

    constructor() {
        this.studentRepository = new StudentRepository()
        this.getAllStudents = this.getAllStudents.bind(this)
        this.hasDifferentPrograms = this.hasDifferentPrograms.bind(this)
        this.hasStudentTwice = this.hasStudentTwice.bind(this)
        this.verifyMembers = this.verifyMembers.bind(this)
        this.joinMembers = this.joinMembers.bind(this)
        this.disjoinMembersById = this.disjoinMembersById.bind(this)
        this.getStudentsByTeamId = this.getStudentsByTeamId.bind(this)
        this.getByListId = this.getByListId.bind(this)
    }

    async getAllStudents(): Promise<Student[]> {
        return await this.studentRepository.getAllStudents()
    }

    private hasDifferentPrograms(students: Student[]): boolean {
        const firstStudent = students[0]
        let hasDifferentPrograms = false

        students.forEach((student: Student, index) => {
            if (index !== 0 && student.program != firstStudent.program) {
                hasDifferentPrograms = true
            }
        })

        return hasDifferentPrograms
    }

    private hasStudentTwice(students: Student[], student: Student, studentIndex: Number): boolean {
        let hasStudentTwice = false
        students.forEach((st, index) => {
            if (studentIndex !== index && st.id === student.id) {
                hasStudentTwice = true
            }
        })

        return hasStudentTwice
    }

    async verifyMembers(studentsId: Number[]): Promise<BaseResponseDto> {
        const students = await this.studentRepository.getByListId(studentsId)

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
            return new BaseResponseDto('Algum dos membros já faz parte de um time', false)

        else if (!this.hasDifferentPrograms(students))
            return new BaseResponseDto('Para formar um time, é necessário que haja integrantes de pelo menos 2 cursos diferentes', false)

        else if (hasSameStudentTwice) {
            return new BaseResponseDto('Não pode haver um(a) estudante duas vezes no mesmo time', false)

        } else
            return new BaseResponseDto()
    }

    async joinMembers(studentsId: Number[], teamId: Number): Promise<void> {
        const students = await this.studentRepository.getByListId(studentsId)
        if (students.length !== studentsId.length) {
            //algum aluno não foi encontrado, lançar exceção?
        }
        await this.studentRepository.joinMembers(studentsId, teamId)
    }

    async disjoinMembersById(studentsId: Number[]): Promise<any> {
        const students = await this.studentRepository.getByListId(studentsId)
        if (students.length !== studentsId.length) {
            //algum aluno não foi encontrado, lanar excecao?
        }

        await this.studentRepository.disjoinMembersById(studentsId)
    }

    async disjoinMembersByTeamId(teamId: Number): Promise<any> {
        await this.studentRepository.disjoinMembersByTeamId(teamId)
    }

    async getStudentsByTeamId(teamId: Number): Promise<Student[]> {
        return await this.studentRepository.getByTeam(teamId)
    }

    async getByListId(studentsId: Number[]) {
        return await this.studentRepository.getByListId(studentsId)
    }

}