import Team from "../../domains/entities/team";
import Student from "../../domains/entities/student";
import Rating from "../../domains/entities/rating";
import TeamServiceFacade from "./teamServiceFacade";
import TeamRepository from "../../repositories/teamRepository";
import StudentServiceFacade from "../studentService/studentServiceFacade";
import StudentService from "../studentService/studentService";

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
        this.addRating = this.addRating.bind(this)
    }
    getAllTeams(): Team[] {
        const teams = this.teamRepository.getAllTeams()

        return teams.map((team: Team) => {
            const studentsObjects = this.studentService.getByListId(team.students.map((student: Student) => student.id))
            team.students = studentsObjects
            return team
        })
    }

    saveTeam(studentsId: Number[], name: String): any {
        const canTeamBeCreated = this.studentService.verifyMembers(studentsId)
        let newTeam = null

        if (canTeamBeCreated) {
            const students = this.studentService.getByListId(studentsId)

            newTeam = new Team(students, name)
            this.teamRepository.saveTeam(newTeam)

            this.studentService.joinMembers(students)
        }

        return { success: canTeamBeCreated, ...newTeam }
    }

    updateTeam(id: Number, studentsId: Number[], name: String): any {
        const team = this.teamRepository.findById(id)

        if (!!team) {
            const removedStudents = team.students.filter((student: Student) => !studentsId.includes(student.id))

            if (removedStudents.length > 0) {
                this.studentService.disjoinMembers(removedStudents.map((student: Student) => student.id))
            }

            this.studentService.joinMembers(studentsId)

            team.students = this.studentService.getByListId(studentsId)
            team.name = name

            this.teamRepository.updateTeam(team)
            return { success: true, message: 'Time editado com sucesso', team }
        }
        return { success: false, message: 'Nenhum time com esse identificador foi encontrado' }
    }

    removeTeam(id: Number): any {
        const team = this.teamRepository.findById(id)

        if (!!team) {
            this.teamRepository.removeTeam(id)
            this.studentService.disjoinMembers(team.students.map((student: Student) => student.id))

            return { success: true, message: 'Time removido com sucesso' }
        }
        return { success: false, message: 'Nenhum time com esse identificador foi encontrado' }
    }

    addRating(teamId: Number, rating: Rating): any {
        /************************************** 
         * NÃO DEVERIA SER NO RATING SERVICE? *
         **************************************
        */

        // const team = this.teamRepository.findById(teamId)

        // if (!!team) {

        //     team.ratings.push(rating)
        //     this.teamRepository.updateTeam(team)

        //     return { success: true, message: 'Avaliação enviada com sucesso' }
        // }

        // return { success: false, message: 'Nenhum time com esse identificador foi encontrado' }
    }
}