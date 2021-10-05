import { inject, injectable } from 'tsyringe'
import IClientsRepository from '../../repository/IClientsRepository'

@injectable()
export default class VerifyCPFService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository
  ) {}

  public async execute(cpf: string): Promise<void> {
    const solicitation = await this.clientsRepository.findSolicitation(cpf)

    if (solicitation && solicitation.status === 'disapproved') {
      throw new Error('Solicitação foi desaprovada')
    }
  }
}
