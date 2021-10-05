import { inject, injectable } from 'tsyringe'
import IClientsRepository from '../../repository/IClientsRepository'
import Client from '../../entities/Client'

@injectable()
export default class FindAllClientsService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository
  ) {}

  public async execute(): Promise<Client[] | undefined> {
    return this.clientsRepository.index()
  }
}
