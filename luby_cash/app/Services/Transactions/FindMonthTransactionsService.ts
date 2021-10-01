import User from 'App/Models/User'
import { DateTime } from 'luxon'

class FindMonthTransactionsService {
  public async execute(userId: string) {
    const oneMonth = DateTime.now().minus({ months: 1 })

    const user = await User.findOrFail(userId)
    await user.load('account')
    await user.account.load('outbound', (transactionQuery) => {
      transactionQuery.where('created_at', '>', oneMonth.toSQL())
    })
    await user.account.load('inbound', (transactionQuery) => {
      transactionQuery.where('created_at', '>', oneMonth.toSQL())
    })

    return user
  }
}

export default new FindMonthTransactionsService()
