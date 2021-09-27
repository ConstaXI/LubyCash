import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateSolicitationValidator from 'App/Validators/CreateSolicitationValidator'
import UpdateSolicitationValidator from 'App/Validators/UpdateSolicitationValidator'
import CreateSolicitationService from 'App/Services/Solicitation/CreateSolicitationService'
import PaginateSolicitationsService from 'App/Services/Solicitation/PaginateSolicitationsService'
import DeleteSolicitationService from 'App/Services/Solicitation/DeleteSolicitationService'
import FindSolicitationService from 'App/Services/Solicitation/FindSolicitationService'
import UpdateSolicitationService from 'App/Services/Solicitation/UpdateSolicitationService'

export default class UsersController {
  public async create({ request, response }: HttpContextContract) {
    const data = await request.validate(CreateSolicitationValidator)

    const solicitation = await CreateSolicitationService.execute(data)

    return response.status(201).send(solicitation)
  }

  public async index({ request, response }: HttpContextContract) {
    const page = request.input('page', 1)
    const perPage = request.input('per_page', 10)

    const users = await PaginateSolicitationsService.execute(page, perPage)

    return response.status(200).send(users)
  }

  public async delete({ request, response }: HttpContextContract) {
    const id: string = request.param('id')

    const solicitation = await FindSolicitationService.execute(id)

    await DeleteSolicitationService.execute(solicitation)

    return response.status(200)
  }

  public async update({ request, response }: HttpContextContract) {
    const id: string = request.param('id')

    const data = await request.validate(UpdateSolicitationValidator)

    const solicitation = await FindSolicitationService.execute(id)

    await UpdateSolicitationService.execute(data, solicitation)

    return response.status(200).send(solicitation)
  }
}
