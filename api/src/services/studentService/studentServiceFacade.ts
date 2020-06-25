import Student from "../../domains/entities/student";

export default interface StudentServiceFacade {
    getAllStudents(): Student[]

    verifyMembers(studentsId: Number[]): any // definir retorno

    joinMembers(studentsId: Number[]): any // definir retorno

    disjoinMembers(studentsId: Number[]): any // definir retorno

    getByListId(studentsId: Number[]): any // definir retorno
}