interface User {
    user: {
        name: string
        surname: string
        cpf: string
        email: string
        password: string
    }
    address: {
        zip_code: string
        city: string
        state: string
    }
    role: {
        user_type: string
    }
    phones: {
        phone: string
    }[]
    solicitation: {
        average_income: number
        account_type: string
    }
}

class ValidateUserService {
    public async execute(user: User) {
        if (user.solicitation.average_income >= 500) {

        }
    }
}

export default new ValidateUserService()
