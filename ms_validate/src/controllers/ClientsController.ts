import { Request, Response } from 'express'
import { getRepository, Repository } from 'typeorm'
import Client from '../entities/Client'
import { validate } from "class-validator";

class ClientsController {
  private ormRepository: Repository<Client>

  constructor() {
    this.ormRepository = getRepository(Client)
  }

  public async create(request: Request, response: Response) {
    const client = new Client()

    Object.assign(client, request.body)

    await validate(client)

    return response.status(201).json(client)
  }
}

export default new ClientsController()
