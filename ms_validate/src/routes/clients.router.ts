import { Router } from 'express'
import ClientsController from '../controllers/ClientsController'

const clientsRouter = Router()

clientsRouter.post('/', ClientsController.create)

export default clientsRouter
