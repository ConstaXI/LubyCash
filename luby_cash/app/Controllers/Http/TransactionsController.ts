import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateTransactionValidator from 'App/Validators/CreateTransactionValidator'
import FindAccountService from 'App/Services/Accounts/FindAccountService'
import CreateTransactionService from 'App/Services/Transactions/CreateTransactionService'

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
}
