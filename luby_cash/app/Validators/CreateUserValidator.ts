import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    user_body: schema.object().members({
      name: schema.string({}, [rules.alpha()]),
      surname: schema.string({}, [rules.alpha()]),
      cpf: schema.string({}, [rules.maxLength(12)]),
      email: schema.string({}, [rules.email()]),
      password: schema.string({}, [rules.confirmed()]),
    }),
    address: schema.object().members({
      zip_code: schema.string({}, [rules.maxLength(8)]),
      city: schema.string(),
      state: schema.string(),
    }),
    phones: schema.array().members(
      schema.object().members({
        phone: schema.string({}, [rules.maxLength(14)]),
      })
    ),
    role: schema.object().members({
      user_type: schema.enum(['client', 'administrator']),
    }),
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages = {}
}
