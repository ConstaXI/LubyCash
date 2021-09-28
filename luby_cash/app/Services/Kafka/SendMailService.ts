import ProducerService from 'App/Services/Kafka/ProducerService'
import User from 'App/Models/User'

class SendMail {
  public async execute(user: User) {
    await ProducerService.execute('change-status', [{ value: user.solicitation.average_income }])
  }
}

export default new SendMail()
