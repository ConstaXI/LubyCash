import { inject, injectable } from "tsyringe";
import IClientsRepository from "../../repository/IClientsRepository";
import Client from "../../entities/Client";

@injectable()
export default class FindClientsByStatus {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository
  ) {}

  public async execute(status: string): Promise<Client[] | undefined> {
    return this.clientsRepository.index(status)
  }
}
