import { Router } from 'express'
import ClientsController from '../controllers/ClientsController'

const clientsRouter = Router()

clientsRouter.post('/', ClientsController.create)
clientsRouter.get('/', ClientsController.index)

export default clientsRouter
