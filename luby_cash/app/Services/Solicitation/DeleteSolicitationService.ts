import Solicitation from 'App/Models/Solicitation'

class DeleteSolicitationService {
  public async execute(solicitation: Solicitation) {
    await solicitation.delete()
  }
}

export default new DeleteSolicitationService()
