import Student from "../../domains/entities/student";
import BaseResponseDto from "../../domains/dtos/baseResponseDto";

export default interface StudentServiceFacade {
    getAllStudents(): Promise<Student[]>

    saveStudent(name: String, program: String): Promise<BaseResponseDto>

    verifyMembers(studentsId: Number[]): any // definir retorno

    joinMembers(studentsId: Number[], teamId: Number): Promise<any> // definir retorno

    disjoinMembersById(studentsId: Number[]): Promise<any> // definir retorno

    disjoinMembersByTeamId(teamId: Number): Promise<any> // definir retorno

    getStudentsByTeamId(teamId: Number): Promise<Student[]>

    getByListId(studentsId: Number[]): Promise<Student[]> // definir retorno
}