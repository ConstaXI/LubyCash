import ProducerService from './ProducerService'
import { getRepository } from 'typeorm'
import User from '../entities/User'
import Account from '../entities/Account'

class ValidateUserService {
  public async execute(user_id: string) {
    const usersRepository = getRepository(User)

    const user = await usersRepository.findOneOrFail(user_id, { relations: ['solicitation'] })

    if (user.solicitation.average_income >= 500) {
      let account = new Account()
      account.current_balance = 200
      user.account = account
      await user.save()

      await ProducerService.execute('handle-response', [{ value: user.id }, { value: 'approved' }])
      return
    }

    await ProducerService.execute('handle-response', [{ value: user.id }, { value: 'disapproved' }])
  }
}

export default new ValidateUserService()
