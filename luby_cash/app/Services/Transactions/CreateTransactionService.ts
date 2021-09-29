import Account from 'App/Models/Account'
import Transaction from 'App/Models/Transaction'

class CreateTransactionService {
  public async execute(value: number, source_account: Account, destination_account: Account) {
    source_account.current_balance -= value
    destination_account.current_balance += value

    await source_account.save()
    await destination_account.save()

    return Transaction.create({
      value: value,
      source_account_id: source_account.id,
      destination_account_id: destination_account.id,
    })
  }
}

export default new CreateTransactionService()
