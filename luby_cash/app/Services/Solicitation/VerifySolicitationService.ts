import User from 'App/Models/User'
import { Exception } from '@poppinss/utils'

class VerifySolicitationService {
  public async execute(email: string) {
    const user = await User.findByOrFail('email', email)

    await user.load('solicitation')

    if (user.solicitation.status === ('waiting' || 'disapproved')) {
      throw new Exception('Você já fez uma solicitação', 500)
    }
  }
}

export default new VerifySolicitationService()
