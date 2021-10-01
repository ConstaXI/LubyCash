import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Exception } from '@poppinss/utils'

export default class IsAdmin {
  public async handle({ auth }: HttpContextContract, next: () => Promise<void>) {
    auth.user!.load('role')

    if (auth.user!.role.user_type !== 'administrator') {
      throw new Exception('Você não é administrador.', 403)
    }

    await next()
  }
}
