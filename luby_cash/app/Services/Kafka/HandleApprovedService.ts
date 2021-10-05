import User from 'App/Models/User'

interface Response {
  email: string
  password: string
  status: string
}

class HandleApprovedService {
  public async execute({ status, email, password }: Response) {
    if (status === 'approved') {
      const user = await User.create({ email: email, password: password })
      await user.related('account').create({ current_balance: 200 })
      await user.related('role').create({ user_type: 'client' })
    }
  }
}

export default new HandleApprovedService()
