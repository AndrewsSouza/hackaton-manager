import Team from "../../domains/entities/team";
import Rating from "../../domains/entities/rating";

export default interface TeamServiceFacade {
    getAllTeams(): Team[],

    saveTeam(studentsId: Number[], name: String): any, // definir retorno
    
    updateTeam(id: Number, studentsId: Number[], name: String): any // definir retorno
    
    removeTeam(id: Number): any, // definir retorno
    
    addRating(teamId: Number, rating: Rating): any, // definir retorno
    
}