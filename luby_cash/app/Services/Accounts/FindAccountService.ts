import Account from 'App/Models/Account'

class FindAccountService {
  public async execute(id: string) {
    return Account.findOrFail(id)
  }
}

export default new FindAccountService()
