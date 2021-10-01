import { Router } from 'express'
import ClientsController from '../controllers/ClientsController'

const clientsRouter = Router()

clientsRouter.post('/clients', ClientsController.create)
