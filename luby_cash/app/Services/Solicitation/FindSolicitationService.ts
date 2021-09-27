import Solicitation from 'App/Models/Solicitation'

class FindSolicitationService {
  public async execute(id: string) {
    return Solicitation.findOrFail(id)
  }
}

export default new FindSolicitationService()
