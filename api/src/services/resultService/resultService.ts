import BaseResponseDto from "../../domains/dtos/baseResponseDto";
import ServiceFactory from "../serviceFactory";
import ResultServiceFacade from "./resultServiceFacade";
import RatingServiceFacade from "../ratingService/ratingServiceFacade";
import TeamServiceFacade from "../teamService/teamServiceFacade";
import Team from "../../domains/entities/team";

export default class ResultService implements ResultServiceFacade {
    ratingService: RatingServiceFacade
    teamService: TeamServiceFacade

    constructor() {
        this.ratingService = ServiceFactory.getRatingService()
        this.teamService = ServiceFactory.getTeamService()
    }
    async getResult(): Promise<BaseResponseDto> {
        try {
            const qualifiedTeamsId = await this.ratingService.getQualifiedTeamsId()

            const teams = await this.teamService.getTeamsWithStudentsAndRatings(qualifiedTeamsId)

            this.calculateFinalRatings(teams)
            this.sortDesc(teams)

            const response = new BaseResponseDto()
            response.teams = teams

            return response
        } catch (err) {
            const response = new BaseResponseDto("Não foi possível calcular o resultado", false)
            response.err = err

            return response
        }
    }

    private calculateFinalRatings(teams: Team[]): void {
        teams.map(team => {
            team.ratings.map(rating => {
                rating.sum = rating.innovation + rating.pitch + rating.process + rating.team + rating.working
                return rating
            })

            team.finalRating = team.ratings.reduce((prev, curr) => {

                return curr.sum ? prev + curr.sum : prev
            }, 0)
        })
    }

    private sortDesc(teams: Team[]): void {
        teams.sort((teamA, teamB) => {

            if (teamA.finalRating && 
                teamB.finalRating && 
                teamA.finalRating > teamB.finalRating) {
                return -1
            }
            return 1
        })
    }
}