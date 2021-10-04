import { Request, Response } from 'express'
import CreateClientService from '../services/clients/CreateClientService'
import { container } from 'tsyringe'

class ClientsController {
  public async create(request: Request, response: Response) {
    const createClientService = container.resolve(CreateClientService)

    const client = await createClientService.execute(request.body)

    return response.status(201).json(client)
  }
}

export default new ClientsController()
