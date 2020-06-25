import { Router } from 'express'
import StudentController from '../controllers/studentController'
import TeamController from '../controllers/teamController'
import RatingController from '../controllers/ratingController'

const ratingController = new RatingController()
const teamController = new TeamController()
const studentController = new StudentController()

const routes = Router()

routes.get('/students', studentController.getAllStudents)
routes.get('/teams', teamController.getAllTeams)
routes.post('/teams', teamController.saveTeam)
routes.put('/teams', teamController.updateTeam)
routes.delete('/teams/:id', teamController.removeTeam)
routes.post('/ratings', ratingController.saveRating)

export default routes