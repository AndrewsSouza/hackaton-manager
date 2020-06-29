import Team from "../../domains/entities/team";

export default interface TeamServiceFacade {
    getAllTeams(): Promise<Team[]>,

    saveTeam(studentsId: Number[], name: String): Promise<any>, // definir retorno

    updateTeam(id: Number, studentsId: Number[], name: String): any // definir retorno

    removeTeam(id: Number): any, // definir retorno

    findById(id: Number): Promise<Team>, // definir retorno
}