import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateAdminValidator from 'App/Validators/CreateAdminValidator'
import CreateAdminService from 'App/Services/Admins/CreateAdminService'

export default class AdminsControllers {
  public async create({ request, response }: HttpContextContract) {
    const data = await request.validate(CreateAdminValidator)

    const admin = await CreateAdminService.execute(data)

    return response.status(201).send(admin)
  }
}
