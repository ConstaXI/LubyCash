import User from 'App/Models/User'
import { Exception } from '@poppinss/utils'

class VerifyApproved {
  public async execute(user: User) {
    if (user.solicitation.status !== 'approved') throw new Exception('Você não foi aprovado')
  }
}

export default new VerifyApproved()
