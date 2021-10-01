import User from 'App/Models/User'

interface CreateAdmin {
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

class CreateAdminService {
  public async execute({ user_body, role, address, phones }: CreateAdmin) {
    // todo: Multiple creations and instantiations, it seems to be wrong

    const admin = await User.create(user_body)

    await admin.related('role').create(role)
    await admin.related('address').create(address)
    await admin.related('phones').createMany(phones)

    await admin.load('role')
    await admin.load('address')
    await admin.load('phones')

    return admin
  }
}

export default new CreateAdminService()
