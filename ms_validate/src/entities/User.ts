import { IsEmail, MinLength } from "class-validator";

export default class User {
  @IsEmail()
  email: string

  @MinLength(6)
  password: string
}
