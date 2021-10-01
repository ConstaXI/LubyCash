import User from 'App/Models/User'

class FindByEmailService {
  public async execute(email: string) {
    const user = await User.findByOrFail('email', email)
    await user.load('role')
    await user.load('solicitation')
    return user
  }
}

export default new FindByEmailService()
