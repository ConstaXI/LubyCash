import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

export default class ClientsController {
  public async index({ request, response }: HttpContextContract) {
    const status = request.param('status')

    const clients = await Database.connection('pg_ms')
      .from('ms_clients')
      .leftJoin('solicitations', (query) => {
        query.on('clientId', '=', 'ms_clients.id')
      })
      .where('status', '=', status)

    return response.status(200).send(clients)
  }
}
