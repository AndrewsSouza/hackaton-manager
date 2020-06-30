import { Request, Response, NextFunction } from 'express'
import TeamServiceFacade from "../services/teamService/teamServiceFacade";
import TeamService from "../services/teamService/teamService";
import ServiceFactory from '../services/serviceFactory';

export default class TeamController {
    teamService: TeamServiceFacade

    constructor() {
        this.teamService = ServiceFactory.getTeamService()

        this.getAllTeamsWithStudents = this.getAllTeamsWithStudents.bind(this)
        this.getAllTeamsWithStudentsAndRatings = this.getAllTeamsWithStudentsAndRatings.bind(this)
        this.saveTeam = this.saveTeam.bind(this)
        this.updateTeam = this.updateTeam.bind(this)
        this.removeTeam = this.removeTeam.bind(this)
    }

    async getAllTeamsWithStudents(req: Request, res: Response, next: NextFunction): Promise<any> {
        const teams = await this.teamService.getAllTeamsWithStudents()
        res.json(teams)
        next()
    }

    async getAllTeamsWithStudentsAndRatings(req: Request, res: Response, next: NextFunction): Promise<any> {
        const teams = await this.teamService.getTeamsWithStudentsAndRatings()
        res.json(teams)
        next()
    }

    async saveTeam(req: Request, res: Response, next: NextFunction): Promise<any> {
        const { students, name } = req.body

        const studentsId = students.map((st: any) => Number(st))

        const result = await this.teamService.saveTeam(studentsId, name)
        res.send({ ...result })
        next()
    }

    async updateTeam(req: Request, res: Response, next: NextFunction): Promise<any> {
        const { id, students, name } = req.body

        const studentsId = students.map((st: any) => Number(st))

        const result = await this.teamService.updateTeam(Number(id), studentsId, name)
        res.send({ ...result })
        next()
    }

    async removeTeam(req: Request, res: Response, next: NextFunction): Promise<any> {
        const { id } = req.params

        const result = await this.teamService.removeTeam(Number(id))

        res.send({ ...result })
        next()
    }
}