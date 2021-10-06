import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateTransactionValidator from 'App/Validators/CreateTransactionValidator'
import CreateTransactionService from 'App/Services/Transactions/CreateTransactionService'
import FindMonthTransactionsService from 'App/Services/Transactions/FindTransactions'
import FindUserByCPFService from 'App/Services/Users/FindUserByCPFService'

export default class UsersController {
  public async create({ auth, request, response }: HttpContextContract) {
    const data = await request.validate(CreateTransactionValidator)

    const destinationUser = await FindUserByCPFService.execute(data.cpf)

    const transactions = await CreateTransactionService.execute(
      data.value,
      auth.user!.account,
      destinationUser.account
    )

    return response.status(201).send(transactions)
  }

  public async index({ request, response }: HttpContextContract) {
    const userId: string = request.param('user_id')

    const user = await FindMonthTransactionsService.execute(userId)

    return response
      .status(200)
      .send({ inbound: user.account.inbound, outbound: user.account.outbound })
  }
}
