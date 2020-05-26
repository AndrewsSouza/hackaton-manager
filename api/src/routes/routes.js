const { Router } = require('express')
const studentController = require('../controllers/studentController')
const teamController = require('../controllers/teamController')
const ratingController = require('../controllers/ratingController')

const routes = Router()

routes.get('/students', studentController.getAllStudents)
routes.get('/teams', teamController.getAllTeams)
routes.post('/teams', teamController.saveTeam)
routes.put('/teams', teamController.updateTeam)
routes.delete('/teams/:id', teamController.removeTeam)
routes.post('/ratings', ratingController.saveRating)

module.exports = routes