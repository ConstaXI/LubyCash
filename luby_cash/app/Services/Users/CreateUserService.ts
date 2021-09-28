import User from 'App/Models/User'

interface CreateUser {
  user_body: {
    name: string
    surname: string
    cpf: string
    email: string
    password: string
  }
  address: {
    zip_code: string
    city: string
    state: string
  }
  role: {
    user_type: string
  }
  phones: {
    phone: string
  }[]
  solicitation: {
    average_income: number
    account_type: string
  }
}

class CreateUserService {
  public async execute({ user_body, role, address, phones, solicitation }: CreateUser) {
    // todo: Multiple creations and instantiations, it seems to be wrong

    const user = await User.create(user_body)

    await user.related('role').create(role)
    await user.related('address').create(address)
    await user.related('phones').createMany(phones)
    await user.related('solicitation').create(solicitation)

    await user.load('role')
    await user.load('address')
    await user.load('phones')
    await user.load('solicitation')

    return user
  }
}

export default new CreateUserService()
