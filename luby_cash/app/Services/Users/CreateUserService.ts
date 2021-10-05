import User from 'App/Models/User'

interface CreateUser {
  role: string
  email: string
  password: string
}

class CreateUserService {
  public async execute({ password, email, role }: CreateUser) {
    // todo: Multiple creations and instantiations, it seems to be wrong

    const user = await User.create({ email, password })

    await user.related('role').create({ user_type: role })

    await user.load('role')

    return user
  }
}

export default new CreateUserService()
