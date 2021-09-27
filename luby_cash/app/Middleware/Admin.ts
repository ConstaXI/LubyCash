import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class IsAdmin {
  public async handle({ response, auth }: HttpContextContract, next: () => Promise<void>) {
    auth.user!.load('role')

    // @ts-ignore
    if (auth.user!.role !== 'administrator') {
      return response.status(403).send('Você não é administrador.')
    }

    await next()
  }
}
