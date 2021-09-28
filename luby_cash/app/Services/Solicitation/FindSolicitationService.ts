import Solicitation from 'App/Models/Solicitation'

class FindSolicitationService {
  public async execute(id: string) {
    const solicitation = await Solicitation.findOrFail(id)

    await solicitation.load('user')

    return solicitation
  }
}

export default new FindSolicitationService()
