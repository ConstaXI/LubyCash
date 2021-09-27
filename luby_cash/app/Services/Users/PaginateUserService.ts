import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'

class PaginateUserService {
  public async execute(page: number, perPage: number) {
    return Database.query<User>().paginate(page, perPage)
  }
}

export default new PaginateUserService()
