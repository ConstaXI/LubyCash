import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { DateTime } from 'luxon'
import FindByEmailService from '../../Services/Users/FindByEmailService'
import VerifyApproved from 'App/Services/Sessions/VerifyApproved'

export default class SessionsController {
  public async login({ auth, request, response }: HttpContextContract) {
    const email: string = request.input('email')
    const password: string = request.input('password')

    const user = await FindByEmailService.execute(email)

    await VerifyApproved.execute(user)

    const { token } = await auth.attempt(email, password, {
      expires_at: DateTime.now().plus({ hours: 1 }),
    })

    return response.status(200).send({ user, token })
  }

  public async logout({ auth }: HttpContextContract) {
    await auth.logout()
  }
}
