import Transaction from 'App/Models/Transaction'

class PaginateTransactionsService {
  public async execute(page: number, perPage: number) {
    return Transaction.query().paginate(page, perPage)
  }
}

export default new PaginateTransactionsService()
