import { inject, injectable } from 'tsyringe'
import IClientsRepository from '../../repository/IClientsRepository'
import Client from '../../entities/Client'

@injectable()
export default class CreateClientService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository
  ) {}

  public async execute(data: ICreateClientDTO): Promise<Client> {
    const client = await this.clientsRepository.create(data)

    if (client.solicitation.average_income > 500) {
      client.solicitation.status = 'approved'
    } else {
      client.solicitation.status = 'disapproved'
    }

    await client.solicitation.save()

    return client
  }
}
