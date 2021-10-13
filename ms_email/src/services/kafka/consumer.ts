import { Kafka, Consumer } from 'kafkajs'
import SendMail from "../mail/SendMain";

class ConsumerService {
  private consumer: Consumer

  constructor() {
    const kafka = new Kafka({
      clientId: 'luby_cash_consumer',
      brokers: ['localhost:9092'],
    })

    this.consumer = kafka.consumer({ groupId: 'send-mail' })
  }

  public async execute(topic: string, fromBeginning: boolean) {
    await this.consumer.connect()
    await this.consumer.subscribe({ topic, fromBeginning })
    await this.consumer.run({
      eachMessage: async ({ message }) => {
        console.dir(JSON.parse(String(message.value)))
        await SendMail.execute(JSON.parse(String(message.value)))
      },
    })
  }
}

export default new ConsumerService()
