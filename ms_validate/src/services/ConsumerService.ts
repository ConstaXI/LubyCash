import { Kafka } from 'kafkajs'
import ValidateUserService from './ValidateUserService'

export default class ConsumerService {
  private consumer

  constructor(groupId: string) {
    const kafka = new Kafka({
      clientId: 'ms_consumer',
      brokers: ['localhost:9092'],
    })

    this.consumer = kafka.consumer({ groupId })
  }

  public async execute(topic: string, fromBeginning: boolean) {
    await this.consumer.connect()
    await this.consumer.subscribe({ topic, fromBeginning })
    await this.consumer.run({
      eachMessage: async ({ message }) => {
        console.dir(JSON.parse(String(message.value)))
        await ValidateUserService.execute(JSON.parse(String(message.value)))
      },
    })
  }
}
