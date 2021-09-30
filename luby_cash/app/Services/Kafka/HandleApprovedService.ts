import User from 'App/Models/User'

interface Response {
  user_id: string
  status: string
}

class HandleApprovedService {
  public async execute({ user_id, status }: Response) {
    const user = await User.findOrFail(user_id)

    await user.load('solicitation')

    user.solicitation.status = status
    await user.solicitation.save()

    if (status === 'approved') {
      await user.related('account').create({ current_balance: 200 })
    }
  }
}

export default new HandleApprovedService()
