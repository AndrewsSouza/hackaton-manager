import Team from "../../domains/entities/team";
import Student from "../../domains/entities/student";
import TeamServiceFacade from "./teamServiceFacade";
import TeamRepository from "../../repositories/teamRepository";
import StudentServiceFacade from "../studentService/studentServiceFacade";
import StudentService from "../studentService/studentService";
import TransactionSingleton from "../../repositories/transaction";
import BaseResponseDto from "../../domains/dto/baseResponseDto";

export default class TeamService implements TeamServiceFacade {
    teamRepository: TeamRepository
    studentService: StudentServiceFacade

    constructor() {
        this.teamRepository = new TeamRepository()
        this.studentService = new StudentService()

        this.getAllTeams = this.getAllTeams.bind(this)
        this.saveTeam = this.saveTeam.bind(this)
        this.updateTeam = this.updateTeam.bind(this)
        this.removeTeam = this.removeTeam.bind(this)
        this.findById = this.findById.bind(this)
    }
    async getAllTeams(): Promise<Team[]> {
        const teams = await this.teamRepository.getAllTeams()
        //Buscar do repository ja com os students?
        const queries = teams.map(async team => {
            return this.studentService.getStudentsByTeamId(team.id)
        });

        const results = await Promise.all(queries)

        teams.forEach((team, index) => {
            team.students = results[index]
        })

        return teams
    }

    async saveTeam(studentsId: Number[], name: String): Promise<BaseResponseDto> {
        const responseVerifyMembers = await this.studentService.verifyMembers(studentsId)

        if (responseVerifyMembers.success) {
            const trx = await TransactionSingleton.getInstance()

            try {
                const id = await this.teamRepository.saveTeam(name)
                await this.studentService.joinMembers(studentsId, id)

                await trx.commit()

                const students = await this.studentService.getByListId(studentsId)
                const newTeam = new Team(id, students, name)

                const response = new BaseResponseDto("Time cadastrado com sucesso")
                response.newTeam = newTeam

                return response
            } catch (err) {
                await trx.rollback()

                const response = new BaseResponseDto("Falha ao cadastrar o time", false)
                response.error = err

                return response
            }
        }

        return responseVerifyMembers
    }

    async updateTeam(teamId: Number, studentsId: Number[], name: String): Promise<any> {
        const team: Team = await this.teamRepository.findById(teamId)
        team.students = await this.studentService.getStudentsByTeamId(teamId)

        if (!!team) {
            const removedStudents = team.students.filter((student: Student) => !studentsId.includes(student.id))

            const trx = await TransactionSingleton.getInstance()
            try {

                if (removedStudents.length > 0) {
                    await this.studentService.disjoinMembersById(removedStudents.map((student: Student) => student.id))
                }

                await this.studentService.joinMembers(studentsId, teamId)
                await this.teamRepository.updateTeam(teamId, name)

                await trx.commit()

                team.name = name
                team.students = await this.studentService.getByListId(studentsId)

                return { success: true, message: 'Time editado com sucesso', team }
            } catch (err) {
                await trx.rollback()
                const response = new BaseResponseDto("Não possível editar o time", false)
                response.error = err

                return response
            }
        }
        return { success: false, message: 'Nenhum time com esse identificador foi encontrado' }
    }

    async removeTeam(id: Number): Promise<any> {
        const team = await this.teamRepository.findById(id)

        if (!!team) {
            const trx = await TransactionSingleton.getInstance()

            try {
                await this.studentService.disjoinMembersByTeamId(id)
                //remove ratings for the team
                await this.teamRepository.removeTeam(id)
                await trx.commit()

                return { success: true, message: 'Time removido com sucesso' }
            } catch (err) {
                await trx.rollback()
                const response = new BaseResponseDto("Não foi possível remover o time", false)
                response.error = err

                return response
            }
        }
        return { success: false, message: 'Nenhum time com esse identificador foi encontrado' }
    }

    async findById(id: Number): Promise<Team> {
        return await this.teamRepository.findById(id)
    }
}