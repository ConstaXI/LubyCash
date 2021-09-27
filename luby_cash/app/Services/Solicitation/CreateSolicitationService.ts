import Solicitation from 'App/Models/Solicitation'

interface CreateSolicitation {
  average_income: number
  account_type: string
}

class CreateSolicitationService {
  public async execute(data: CreateSolicitation) {
    return Solicitation.create(data)
  }
}

export default new CreateSolicitationService()
