const studentRepository = require('../repositories/studentRepository')

module.exports = {
    getAllStudents: () => {
        return studentRepository.getAllStudents()
    },
    verifyMembers: (students) => {
        return studentRepository.verifyMembers(students)
    },
    joinMembers: (students) => {
        return studentRepository.joinMembers(students)
    },
    disjoinMembers: (students) => {
        return studentRepository.disjoinMembers(students)
    },
    getByListId: (listId) => {
        return studentRepository.getByListId(listId)
    }

}