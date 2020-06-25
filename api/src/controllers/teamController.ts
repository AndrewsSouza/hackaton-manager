import { Request, Response, NextFunction } from 'express'
import TeamServiceFacade from "../services/teamService/teamServiceFacade";
import TeamService from "../services/teamService/teamService";

export default class TeamController {
    teamService: TeamServiceFacade

    constructor() {
        this.teamService = new TeamService()
        this.getAllTeams = this.getAllTeams.bind(this)
        this.saveTeam = this.saveTeam.bind(this)
        this.updateTeam = this.updateTeam.bind(this)
        this.removeTeam = this.removeTeam.bind(this)
    }

    getAllTeams(req: Request, res: Response, next: NextFunction) {
        const teams = this.teamService.getAllTeams()
        return res.json(teams)
    }

    saveTeam(req: Request, res: Response, next: NextFunction): any {
        const { students, name } = req.body

        const studentsId = students.map((st: any) => Number(st))

        const result = this.teamService.saveTeam(studentsId, name)
        return res.send({ ...result })
    }

    updateTeam(req: Request, res: Response, next: NextFunction): any {
        const { id, students, name } = req.body

        const studentsId = students.map((st: any) => Number(st))

        const result = this.teamService.updateTeam(Number(id), studentsId, name)
        return res.send({ ...result })
    }
    
    removeTeam(req: Request, res: Response, next: NextFunction): any {
        const { id } = req.params

        const result = this.teamService.removeTeam(Number(id))

        return res.send({ ...result })
    }
}