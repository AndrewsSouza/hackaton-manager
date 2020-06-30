import Team from "../../domains/entities/team";
import Student from "../../domains/entities/student";
import TeamServiceFacade from "./teamServiceFacade";
import TeamRepository from "../../repositories/teamRepository";
import StudentServiceFacade from "../studentService/studentServiceFacade";
import TransactionSingleton from "../../repositories/transaction";
import BaseResponseDto from "../../domains/dtos/baseResponseDto";
import RatingServiceFacade from "../ratingService/ratingServiceFacade";
import ServiceFactory from "../serviceFactory";
import Rating from "../../domains/entities/rating";

export default class TeamService implements TeamServiceFacade {
    teamRepository: TeamRepository
    studentService: StudentServiceFacade
    ratingService: RatingServiceFacade

    constructor() {
        this.teamRepository = new TeamRepository()

        this.studentService = ServiceFactory.getStudentService()
        this.ratingService = ServiceFactory.getRatingService()

        this.getAllTeamsWithStudents = this.getAllTeamsWithStudents.bind(this)
        this.getTeamsWithStudentsAndRatings = this.getTeamsWithStudentsAndRatings.bind(this)
        this.saveTeam = this.saveTeam.bind(this)
        this.updateTeam = this.updateTeam.bind(this)
        this.removeTeam = this.removeTeam.bind(this)
        this.findById = this.findById.bind(this)
    }

    private async getStudents(teams: Team[]): Promise<Student[][]> {
        const studentsQueries = teams.map(async team => {
            return this.studentService.getStudentsByTeamId(team.id)
        });

        return await Promise.all(studentsQueries)
    }

    private async getRatings(teams: Team[]): Promise<Rating[][]> {
        const ratingsQueries = teams.map(async team => {
            return this.ratingService.findByTeamId(team.id)
        });

        return await Promise.all(ratingsQueries)
    }

    async getAllTeamsWithStudents(): Promise<Team[]> {
        const teams = await this.teamRepository.getTeams()
        const studentsQueriesResults = await this.getStudents(teams)

        teams.forEach((team, index) => {
            team.students = studentsQueriesResults[index]
        })

        return teams
    }

    async getTeamsWithStudentsAndRatings(teamsId: Number[] = []): Promise<Team[]> {
        const teams = await this.teamRepository.getTeams(teamsId)
        const studentsQueriesResults = await this.getStudents(teams)
        const ratingsQueriesResults = await this.getRatings(teams)

        teams.forEach((team, index) => {
            team.students = studentsQueriesResults[index]
            team.ratings = ratingsQueriesResults[index]
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

    async updateTeam(teamId: Number, studentsId: Number[], name: String): Promise<BaseResponseDto> {
        const team: Team = await this.teamRepository.findById(teamId)
        team.students = await this.studentService.getStudentsByTeamId(teamId)

        if (!!team) {
            const removedStudents = team.students.filter((student: Student) => !studentsId.includes(student.id))
            const addedStudentsId = studentsId.filter(stId => !team.students.map(st => st.id).includes(stId))

            const trx = await TransactionSingleton.getInstance()
            try {

                if (removedStudents.length > 0) {
                    await this.studentService.disjoinMembersById(removedStudents.map((student: Student) => student.id))
                }

                if (addedStudentsId.length > 0) {
                    await this.studentService.joinMembers(addedStudentsId, teamId)
                }

                await this.teamRepository.updateTeam(teamId, name)

                await trx.commit()

                team.name = name
                team.students = await this.studentService.getByListId(studentsId)

                const response = new BaseResponseDto('Time editado com sucesso')
                response.team = team

                return response
            } catch (err) {
                await trx.rollback()
                const response = new BaseResponseDto("Não possível editar o time", false)
                response.error = err

                return response
            }
        }
        return new BaseResponseDto('Nenhum time com esse identificador foi encontrado', false)
    }

    async removeTeam(id: Number): Promise<BaseResponseDto> {
        const team = await this.teamRepository.findById(id)

        if (!!team) {
            const trx = await TransactionSingleton.getInstance()

            try {
                await this.studentService.disjoinMembersByTeamId(id)
                //remove ratings for the team
                await this.teamRepository.removeTeam(id)
                await trx.commit()

                return new BaseResponseDto('Time removido com sucesso')
            } catch (err) {
                await trx.rollback()
                const response = new BaseResponseDto("Não foi possível remover o time", false)
                response.error = err

                return response
            }
        }
        return new BaseResponseDto('Nenhum time com esse identificador foi encontrado', false)
    }

    async findById(id: Number): Promise<BaseResponseDto> {
        const team = await this.teamRepository.findById(id)
        if (!team) {
            return new BaseResponseDto("Time não encontrado", false)
        }

        const response = new BaseResponseDto()
        response.team = team

        return response
    }
}