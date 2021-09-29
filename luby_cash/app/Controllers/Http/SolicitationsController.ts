import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PaginateSolicitationsService from 'App/Services/Solicitations/PaginateSolicitationsService'

export default class UsersController {
  public async index({ request, response }: HttpContextContract) {
    const page = request.input('page', 1)
    const perPage = request.input('per_page', 10)

    const users = await PaginateSolicitationsService.execute(page, perPage)

    return response.status(200).send(users)
  }
}
