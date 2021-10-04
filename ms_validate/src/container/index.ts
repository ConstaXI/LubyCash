import { container } from 'tsyringe'
import ClientsRepository from '../repository/ClientsRepository'

container.registerSingleton('ClientsRepository', ClientsRepository)
