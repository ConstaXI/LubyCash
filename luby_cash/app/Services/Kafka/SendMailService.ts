import ProducerService from 'App/Services/Kafka/ProducerService'

class SendMail {
  public async execute(email: string, status: string) {
    await ProducerService.execute('status-changed', [{ value: email }, { value: status }])
  }
}

export default new SendMail()
