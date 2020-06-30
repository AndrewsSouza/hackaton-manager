import Team from "../../domains/entities/team";
import BaseResponseDto from "../../domains/dtos/baseResponseDto";

export default interface TeamServiceFacade {
    getAllTeamsWithStudents(): Promise<Team[]>,

    getTeamsWithStudentsAndRatings(teamsId?: Number[]): Promise<Team[]>,

    saveTeam(studentsId: Number[], name: String): Promise<BaseResponseDto>, // definir retorno

    updateTeam(id: Number, studentsId: Number[], name: String): Promise<BaseResponseDto> // definir retorno

    removeTeam(id: Number): Promise<BaseResponseDto>, // definir retorno

    findById(id: Number): Promise<BaseResponseDto>, // definir retorno
}