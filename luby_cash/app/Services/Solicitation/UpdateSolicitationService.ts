import Solicitation from 'App/Models/Solicitation'

interface UpdateSolicitation {
  account_type?: string
  average_income?: number
}

class UpdateUserService {
  public async execute(data: UpdateSolicitation, solicitation: Solicitation) {
    return solicitation.merge(data).save()
  }
}

export default new UpdateUserService()
