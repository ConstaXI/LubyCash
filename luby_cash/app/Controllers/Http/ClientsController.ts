import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import { DateTime } from 'luxon'

export default class ClientsController {
  public async index({ request, response }: HttpContextContract) {
    const status = request.param('status')
    const month = request.param('month')
    const year = request.param('year')

    const date = DateTime.fromFormat(`01/${month}/${year}`, 'dd/MM/yyyy')

    console.dir(date.toFormat('dd/MM/yyyy'))

    const clients = await Database.connection('pg_ms')
      .from('ms_clients')
      .leftJoin('solicitations', (query) => {
        query.on('ms_clients.id', '=', 'clientId')
      })
      .select(['ms_clients.*', 'solicitations.created_at as evaluated_at', 'solicitations.status'])
      .where('status', '=', status)
      .andWhere('solicitations.created_at', '>', date.toSQL())

    return response.status(200).send(clients)
  }
}
