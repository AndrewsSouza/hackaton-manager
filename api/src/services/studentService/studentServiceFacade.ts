import Student from "../../domains/entities/student";
import BaseResponseDto from "../../domains/dto/baseResponseDto";

export default interface StudentServiceFacade {
    getAllStudents(): Promise<Student[]>

    verifyMembers(studentsId: Number[]): any // definir retorno

    joinMembers(studentsId: Number[], teamId: Number): Promise<any> // definir retorno

    disjoinMembersById(studentsId: Number[]): Promise<any> // definir retorno

    disjoinMembersByTeamId(teamId: Number): Promise<any> // definir retorno

    getStudentsByTeamId(teamId: Number): Promise<Student[]>

    getByListId(studentsId: Number[]): any // definir retorno
}