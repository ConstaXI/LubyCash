import ProducerService from './ProducerService'
import { getRepository } from 'typeorm'
import User from '../entities/User'
import Solicitation from '../entities/Solicitation'
import Account from '../entities/Account'

interface ISolicitation {
  id: string
  average_income: number
  status: string
  account_type: string
  user_id: string
  createdAt: string
  updatedAt: string
}

class ValidateUserService {
  public async execute(solicitation_prototype: ISolicitation) {
    const usersRepository = getRepository(User)
    const solicitationsRepository = getRepository(Solicitation)
    const accountsRepository = getRepository(Account)

    const user = await usersRepository.findOneOrFail(solicitation_prototype.user_id)

    const user_solicitation = await solicitationsRepository.findOneOrFail(solicitation_prototype.id)

    if (solicitation_prototype.average_income >= 500) {
      user.account = await accountsRepository
        .create({ user_id: user.id, current_balance: 200 })
        .save()

      user_solicitation.status = 'approved'
      await user_solicitation.save()

      await ProducerService.execute('handle-response', [{ value: user.id }, { value: 'approved' }])
    } else {
      user_solicitation.status = 'disapproved'
      await user_solicitation.save()

      await ProducerService.execute('handle-response', [
        { value: user.id },
        { value: 'disapproved' },
      ])
    }
  }
}

export default new ValidateUserService()
