import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateUserValidator from 'App/Validators/CreateUserValidator'
import UpdateUserValidator from 'App/Validators/UpdateUserValidator'
import CreateUserService from 'App/Services/Users/CreateUserService'
import PaginateUserService from 'App/Services/Users/PaginateUserService'
import UpdateUserService from 'App/Services/Users/UpdateUserService'
import DeleteUserService from 'App/Services/Users/DeleteUserService'
import ProducerService from 'App/Services/Kafka/ProducerService'

export default class UsersController {
  public async create({ request, response }: HttpContextContract) {
    const data = await request.validate(CreateUserValidator)

    const user = await CreateUserService.execute(data)

    await ProducerService.execute('handle-new-user', [{ value: JSON.stringify(user) }])

    return response.status(201).send(user)
  }

  public async index({ request, response }: HttpContextContract) {
    const page = request.input('page', 1)
    const perPage = request.input('per_page', 10)

    const users = await PaginateUserService.execute(page, perPage)

    return response.status(200).send(users)
  }

  public async delete({ auth, response }: HttpContextContract) {
    await DeleteUserService.execute(auth.user)

    return response.status(200).send('Conta deletada.')
  }

  public async update({ auth, request, response }: HttpContextContract) {
    const data = await request.validate(UpdateUserValidator)

    const user = await UpdateUserService.execute(data, auth.user)

    return response.status(200).send(user)
  }
}
