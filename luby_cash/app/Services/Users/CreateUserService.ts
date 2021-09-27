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
}

class CreateUserService {
  public async execute({ user_body, role, address, phones }: CreateUser) {
    // todo: Multiple creations and instantiations
    const user = await User.create(user_body)
    await user.related('role').create(role)
    await user.load('role')
    await user.related('address').create(address)
    await user.load('address')
    await user.related('phones').createMany(phones)
    await user.load('phones')
    return user
  }
}

export default new CreateUserService()
