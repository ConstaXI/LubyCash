import { getRepository, Repository } from 'typeorm'
import argon2 from 'argon2'
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

  public async create({
    client_body,
    address,
    phones,
    solicitation,
  }: ICreateClientDTO): Promise<Client> {
    const client = this.clientsRepository.create(client_body)

    client.password = await argon2.hash(client.password)

    await client.save()

    client.solicitation = this.solicitationsRepository.create({
      ...solicitation,
      clientId: client.id,
    })

    await client.solicitation.save()

    client.phones = this.phonesRepository.create(phones)

    for (const phone of client.phones) {
      phone.clientId = client.id
    }

    await this.phonesRepository.save(client.phones)

    client.address = this.addressesRepository.create({ ...address, clientId: client.id })

    await client.address.save()

    return client
  }
}
