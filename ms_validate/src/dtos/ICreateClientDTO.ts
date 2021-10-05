interface ICreateClientDTO {
  name: string
  surname: string
  cpf: string
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
