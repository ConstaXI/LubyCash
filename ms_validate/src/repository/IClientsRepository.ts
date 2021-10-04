import Client from '../entities/Client'

export default interface IClientsRepository {
  create: ({ client_body, address, phones, solicitation }: ICreateClientDTO) => Promise<Client>
  index: () => Promise<Client[] | null>
}
