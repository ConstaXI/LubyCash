import User from 'App/Models/User'

class PaginateUserService {
  public async execute(page: number, perPage: number) {
    return User.query().paginate(page, perPage)
  }
}

export default new PaginateUserService()
