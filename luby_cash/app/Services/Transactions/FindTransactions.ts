import User from 'App/Models/User'
import { DateTime } from 'luxon'

class FindTransactions {
  public async execute(userId: string, month: string, year: string) {
    const date = DateTime.fromFormat(`01/${month}/${year}`, 'dd/MM/yyyy')

    const user = await User.findOrFail(userId)
    await user.load('account')
    await user.account.load('outbound', (transactionQuery) => {
      transactionQuery.where('created_at', '>', date.toSQL())
    })
    await user.account.load('inbound', (transactionQuery) => {
      transactionQuery.where('created_at', '>', date.toSQL())
    })

    return user
  }
}

export default new FindTransactions()
