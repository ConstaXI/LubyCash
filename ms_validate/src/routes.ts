import { Router } from 'express'
import clientsRouter from './routes/clients.router'

const routes = Router()

routes.use('/clients', clientsRouter)

export default routes
