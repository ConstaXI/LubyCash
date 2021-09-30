import { Kafka, Consumer } from 'kafkajs'
import HandleApprovedService from 'App/Services/Kafka/HandleApprovedService'
import ConsumerServiceInterface from 'Contracts/ConsumerServiceInterface'

class ConsumerService implements ConsumerServiceInterface {
  private consumer: Consumer

  constructor() {
    const kafka = new Kafka({
      clientId: 'luby_cash_consumer',
      brokers: ['localhost:9092'],
    })

    this.consumer = kafka.consumer({ groupId: 'app-validation-group' })
  }

  public async execute(topic: string, fromBeginning: boolean) {
    await this.consumer.connect()
    await this.consumer.subscribe({ topic, fromBeginning })
    await this.consumer.run({
      eachMessage: async ({ message }) => {
        console.dir(JSON.parse(String(message.value)))
        await HandleApprovedService.execute(JSON.parse(String(message.value)))
      },
    })
  }
}

export default new ConsumerService()
