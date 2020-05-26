const studentService = require('../services/studentService')

module.exports = {
    getAllStudents(req, res, next) {
        const students = studentService.getAllStudents()

        return res.json(students)
    },
}