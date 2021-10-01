import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import CreateUserService from 'App/Services/Users/CreateUserService'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    for (let i = 0; i < 10; i++) {
      const user = await CreateUserService.execute({
        user_body: {
          name: 'Davi',
          surname: 'Banfi',
          cpf: `${i}${i}${i}${i}${i}${i}${i}${i}${i}${i}${i}${i}`,
          email: `davi${i}@email.com`,
          password: '123456',
        },
        address: { city: 'BH', state: 'MG', zip_code: '12345678' },
        phones: [{ phone: `${i}${i}${i}${i}${i}${i}${i}${i}${i}${i}${i}` }],
        role: { user_type: 'client' },
        solicitation: { account_type: 'checking account', average_income: 600 },
      })

      await user.related('account').create({ current_balance: 200 })
    }
  }
}
