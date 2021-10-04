import GetMsConnection from 'App/Services/Database/GetMsConnection'

class PaginateUserService {
  public async execute(page: number, perPage: number) {
    return GetMsConnection.execute().query().from('ms_clients').paginate(page, perPage)
  }
}

export default new PaginateUserService()
