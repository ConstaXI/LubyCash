import { inject, injectable } from 'tsyringe'
import IClientsRepository from '../../repository/IClientsRepository'

@injectable()
export default class CreateClientService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository
  ) {}

  public async execute(data: ICreateClientDTO) {
    return this.clientsRepository.create(data)
  }
}
