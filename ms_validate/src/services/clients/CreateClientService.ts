import { inject, injectable } from 'tsyringe'
import IClientsRepository from '../../repository/IClientsRepository'
import Client from '../../entities/Client'
import { validateOrReject } from "class-validator";

@injectable()
export default class CreateClientService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository
  ) {}

  public async execute(data: ICreateClientDTO): Promise<Client> {
    const client = await this.clientsRepository.create(data)

    await validateOrReject(client).catch((error) => {
      throw error
    })

    await this.clientsRepository.save(client)

    if (client.solicitation.average_income > 500) {
      client.solicitation.status = 'approved'
    } else {
      client.solicitation.status = 'disapproved'
    }

    await client.solicitation.save()

    return client
  }
}
