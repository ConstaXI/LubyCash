import Account from 'App/Models/Account'

class CreateAccountService {
  public async execute(user_id: string) {
    return Account.create({ user_id: user_id, current_balance: 200 })
  }
}

export default new CreateAccountService()
