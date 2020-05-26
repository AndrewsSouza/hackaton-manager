const Student = require('../domains/entities/student')

let id = 0

const students = [
    new Student(++id, 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Crystal_Clear_kdm_user_female.svg/1200px-Crystal_Clear_kdm_user_female.svg.png', 'Aline', 'ES'),
    new Student(++id, 'https://png.pngtree.com/element_our/png/20181206/users-vector-icon-png_260862.jpg', 'Douglas', 'SI'),
    new Student(++id, 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Crystal_Clear_kdm_user_female.svg/1200px-Crystal_Clear_kdm_user_female.svg.png', 'Edna', 'SI'),
    new Student(++id, 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Crystal_Clear_kdm_user_female.svg/1200px-Crystal_Clear_kdm_user_female.svg.png', 'Flávia', 'CC'),
    new Student(++id, 'https://png.pngtree.com/element_our/png/20181206/users-vector-icon-png_260862.jpg', 'Gerson', 'CC'),
    new Student(++id, 'https://png.pngtree.com/element_our/png/20181206/users-vector-icon-png_260862.jpg', 'Jorge', 'ES'),
    new Student(++id, 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Crystal_Clear_kdm_user_female.svg/1200px-Crystal_Clear_kdm_user_female.svg.png', 'Maria', 'ES'),
    new Student(++id, 'https://png.pngtree.com/element_our/png/20181206/users-vector-icon-png_260862.jpg', 'Pablo', 'SI'),
    new Student(++id, 'https://png.pngtree.com/element_our/png/20181206/users-vector-icon-png_260862.jpg', 'Pedro', 'CC')
]

module.exports = {
    getAllStudents: () => {
        return students
    },
    getByListId: (listId) => {
        return students.filter(s => listId.includes(s.id))
    },
    verifyMembers: (teamStudents) => {

        let hasSameStudentTwice = false
        let hasSomeMemberWithTeam = false
        let hasDifferentPrograms = false

        teamStudents.forEach((studentId, studentIndex) => {
            let student = students.find(s => s.id == studentId)

            teamStudents.forEach((stId, index) => {
                if (student !== index) {
                    hasSameStudentTwice = Number(stId) === Number(studentId)
                }
            })

            if (student != undefined) {
                if (student.teamMember) {
                    hasSomeMemberWithTeam = true
                }
            }
        })

        let firstStudent = students.find(s => s.id == teamStudents[0])
        teamStudents.forEach(studentId => {
            let student = students.find(s => s.id == studentId)
            if (student != undefined) {
                if (student.Id != firstStudent.id && student.program != firstStudent.program) {
                    hasDifferentPrograms = true
                }
            }
        })

        if (hasSomeMemberWithTeam)
            return { success: false, message: 'Algum dos membros já faz parte de um time' }
        else if (!hasDifferentPrograms)
            return { success: false, message: 'Para formar um time, é necessário que haja integrantes de pelo menos 2 cursos diferentes' }
        else if (hasSameStudentTwice) {
            return { success: false, message: 'Não pode haver um(a) estudante duas vezes no mesmo time' }
        } else
            return { success: true, message: '' }
    },
    joinMembers: (teamStudents) => {
        teamStudents.forEach(studentId => {
            let student = students.find(s => s.id == studentId)
            if (student != undefined) {
                student.teamMember = true
            }
        })
    },
    disjoinMembers: (teamStudents) => {
        teamStudents.forEach(studentId => {
            let student = students.find(s => s.id == studentId)
            if (student != undefined) {
                student.teamMember = false
            }
        })
    },
}