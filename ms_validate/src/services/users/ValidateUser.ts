import User from "../../entities/User";
import { validateOrReject } from "class-validator";

interface IUser {
  email: string
  password: string
}

export default class ValidateUser {
  public async execute({email, password}: IUser) {
    const user = new User()
    user.email = email
    user.password = password
    await validateOrReject(user).catch((error) => {
      throw error
    })
  }
}
