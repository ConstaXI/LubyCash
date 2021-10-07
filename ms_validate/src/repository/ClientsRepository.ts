import { getRepository, Repository } from 'typeorm'
import Client from '../entities/Client'
import Solicitation from '../entities/Solicitation'
import Phone from '../entities/Phone'
import Address from '../entities/Address'

export default class ClientsRepository {
  private clientsRepository: Repository<Client>
  private solicitationsRepository: Repository<Solicitation>
  private phonesRepository: Repository<Phone>
  private addressesRepository: Repository<Address>

  constructor() {
    this.clientsRepository = getRepository(Client)
    this.solicitationsRepository = getRepository(Solicitation)
    this.phonesRepository = getRepository(Phone)
    this.addressesRepository = getRepository(Address)
  }

  public async create(data: ICreateClientDTO): Promise<Client> {
    const client = this.clientsRepository.create(data)

    client.solicitation = this.solicitationsRepository.create({
      ...data.solicitation,
      clientId: client.id,
    })

    client.phones = this.phonesRepository.create(data.phones)

    for (const phone of client.phones) {
      phone.clientId = client.id
    }

    client.address = this.addressesRepository.create({ ...data.address, clientId: client.id })

    return client
  }

  public async index(status?: string): Promise<Client[] | undefined> {
    return status ? this.clientsRepository.find({ relations: ['solicitation'], where: { solicitation: { status: status } } }) : this.clientsRepository.find({ relations: ['solicitation'] })
  }

  public async save(client: Client): Promise<Client> {
    return this.clientsRepository.save(client)
  }

  public async findSolicitation(cpf: string): Promise<Solicitation | undefined> {
    const client = await this.clientsRepository.findOne({ where: { cpf: cpf } })

    if (!client) return undefined

    return this.solicitationsRepository.findOne({ where: { clientId: client.id } })
  }
}
