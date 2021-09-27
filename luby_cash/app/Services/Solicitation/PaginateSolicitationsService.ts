import Solicitation from 'App/Models/Solicitation'

class PaginateSolicitationsService {
  public async execute(page: number, perPage: number) {
    return Solicitation.query().paginate(page, perPage)
  }
}

export default new PaginateSolicitationsService()
