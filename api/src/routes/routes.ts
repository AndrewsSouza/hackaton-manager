import { Router } from 'express'
import StudentController from '../controllers/studentController'
import TeamController from '../controllers/teamController'
import RatingController from '../controllers/ratingController'
import TransactionSingleton from '../repositories/transaction'

const ratingController = new RatingController()
const teamController = new TeamController()
const studentController = new StudentController()

const routes = Router()

routes.get('/students', studentController.getAllStudents, TransactionSingleton.closeTransaction)
routes.get('/teams', teamController.getAllTeams, TransactionSingleton.closeTransaction)
routes.post('/teams', teamController.saveTeam, TransactionSingleton.closeTransaction)
routes.put('/teams', teamController.updateTeam, TransactionSingleton.closeTransaction)
routes.delete('/teams/:id', teamController.removeTeam, TransactionSingleton.closeTransaction)
routes.post('/ratings', ratingController.saveRating, TransactionSingleton.closeTransaction)

export default routes