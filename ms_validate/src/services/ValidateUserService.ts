import ProducerService from './ProducerService'

interface ISolicitation {
  id: string
  average_income: number
  status: string
  account_type: string
  user_id: string
  createdAt: string
  updatedAt: string
}

class ValidateUserService {
  public async execute(solicitation: ISolicitation) {
    await ProducerService.execute('handle-response', [
      {
        value: JSON.stringify({
          user_id: solicitation.user_id,
          status: solicitation.average_income > 500 ? 'approved' : 'disapproved',
        }),
      },
    ])
  }
}

export default new ValidateUserService()
