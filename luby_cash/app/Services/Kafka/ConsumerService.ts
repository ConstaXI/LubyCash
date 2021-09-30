import { Kafka, Consumer } from 'kafkajs'

export default class ConsumerService {
  private consumer: Consumer

  constructor(groupId: string) {
    const kafka = new Kafka({
      clientId: 'luby_cash_consumer',
      brokers: ['localhost:9092'],
    })

    this.consumer = kafka.consumer({ groupId })
  }

  public async execute(topic: string, fromBeginning: boolean) {
    await this.consumer.connect()
    await this.consumer.subscribe({ topic, fromBeginning })
    await this.consumer.run({
      eachMessage: async ({ message }) => {
        console.log(String(message.value))
      },
    })
  }
}
