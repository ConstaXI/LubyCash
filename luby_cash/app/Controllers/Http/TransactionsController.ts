import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateTransactionValidator from 'App/Validators/CreateTransactionValidator'
import FindAccountService from 'App/Services/Accounts/FindAccountService'
import CreateTransactionService from 'App/Services/Transactions/CreateTransactionService'
import PaginateTransactionsService from 'App/Services/Transactions/PaginateTransactionsService'

export default class UsersController {
  public async create({ request, response }: HttpContextContract) {
    const data = await request.validate(CreateTransactionValidator)

    const sourceAccount = await FindAccountService.execute(data.source_account_id)
    const destinationAccount = await FindAccountService.execute(data.destination_account_id)

    const transaction = await CreateTransactionService.execute(
      data.value,
      sourceAccount,
      destinationAccount
    )

    return response.status(201).send(transaction)
  }

  public async index({ request, response }: HttpContextContract) {
    const page = request.input('page', 1)
    const perPage = request.input('per_page', 10)

    const transactions = await PaginateTransactionsService.execute(page, perPage)

    return response.status(200).send(transactions)
  }
}
