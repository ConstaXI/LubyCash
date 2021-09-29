import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateAccountService from 'App/Services/Accounts/CreateAccountService'
import CreateAccountValidator from 'App/Validators/CreateAccountValidator'

export default class AccountsControllers {
  public async create({ request, response }: HttpContextContract) {
    const data = await request.validate(CreateAccountValidator)

    const account = CreateAccountService.execute(data.user_id)

    return response.status(201).send(account)
  }
}
