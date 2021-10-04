interface ICreateClientDTO {
  client_body: {
    name: string
    surname: string
    cpf: string
    email: string
    password: string
    password_confirmation: string
  }
  address: {
    zip_code: string
    city: string
    state: string
  }
  phones: {
    phone: string
  }[]
  solicitation: {
    average_income: number
  }
}
