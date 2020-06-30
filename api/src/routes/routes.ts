import { Router } from 'express'
import StudentController from '../controllers/studentController'
import TeamController from '../controllers/teamController'
import RatingController from '../controllers/ratingController'
import TransactionSingleton from '../repositories/transaction'
import ResultController from '../controllers/resultController'

const ratingController = new RatingController()
const teamController = new TeamController()
const studentController = new StudentController()
const resultController = new ResultController()

const routes = Router()

routes.get('/students', studentController.getAllStudents, TransactionSingleton.closeTransaction)
routes.post('/students', studentController.saveStudent, TransactionSingleton.closeTransaction)

routes.get('/teams', teamController.getAllTeamsWithStudents, TransactionSingleton.closeTransaction)
routes.get('/teams-with-ratings', teamController.getAllTeamsWithStudentsAndRatings, TransactionSingleton.closeTransaction)
routes.post('/teams', teamController.saveTeam, TransactionSingleton.closeTransaction)
routes.put('/teams', teamController.updateTeam, TransactionSingleton.closeTransaction)
routes.delete('/teams/:id', teamController.removeTeam, TransactionSingleton.closeTransaction)

routes.post('/ratings', ratingController.saveRating, TransactionSingleton.closeTransaction)
routes.delete('/ratings/:id', ratingController.deleteRating, TransactionSingleton.closeTransaction)

routes.get('/result/', resultController.getResult, TransactionSingleton.closeTransaction)

export default routes