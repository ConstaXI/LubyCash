import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    const user = new User()

    user.email = 'admin@email.com'
    user.password = '123456'
    user.cpf = '11111111111'

    await user.save()

    await user.related('role').create({ user_type: 'administrator' })
  }
}
