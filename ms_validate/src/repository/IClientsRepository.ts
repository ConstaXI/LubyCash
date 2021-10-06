import Client from '../entities/Client'
import Solicitation from '../entities/Solicitation'

export default interface IClientsRepository {
  create: (data: ICreateClientDTO) => Promise<Client>
  index: (status?: string) => Promise<Client[] | undefined>
  save: (client: Client) => Promise<Client>
  findSolicitation: (cpf: string) => Promise<Solicitation | undefined>
}
