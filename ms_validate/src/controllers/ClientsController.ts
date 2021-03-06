import { Request, Response } from 'express'
import CreateClientService from '../services/clients/CreateClientService'
import { container } from 'tsyringe'
import ProducerService from '../services/ProducerService'
import FindAllClientsService from '../services/clients/FindAllClientsService'
import VerifyCPFService from '../services/clients/VerifyCPFService'
import ValidateUser from "../services/users/ValidateUser";

class ClientsController {
  public async create(request: Request, response: Response) {
    try {
      const verifyCPF = container.resolve(VerifyCPFService)

      await verifyCPF.execute(request.body.client_body.cpf)

      const createClientService = container.resolve(CreateClientService)

      const client = await createClientService.execute(request.body.client_body)

      const validateUser = container.resolve(ValidateUser)

      await validateUser.execute(request.body.user_body)

      await ProducerService.execute('handle-response', [
        {
          value: JSON.stringify({
            status: client.solicitation.status,
            cpf: request.body.client_body.cpf,
            ...request.body.user_body,
          }),
        },
      ])

      await ProducerService.execute('send-mail', [{ value: JSON.stringify({
          email: request.body.user_body.email,
          status: client.solicitation.status
        })
      }])

      return response.status(201).json(client)
    } catch (error: any) {
      return response.status(400).json(error)
    }
  }

  public async index(request: Request, response: Response) {
    const findAllClientsService = container.resolve(FindAllClientsService)

    const clients = await findAllClientsService.execute()

    return response.status(201).json(clients)
  }
}

export default new ClientsController()
