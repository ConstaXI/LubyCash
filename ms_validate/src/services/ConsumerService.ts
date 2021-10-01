import { Kafka } from 'kafkajs'
import ValidateUserService from './ValidateUserService'

class ConsumerService {
  private consumer

  constructor() {
    const kafka = new Kafka({
      clientId: 'ms_consumer',
      brokers: ['localhost:9092'],
    })

    this.consumer = kafka.consumer({ groupId: 'ms-validation-group' })
  }

  public async execute(topic: string, fromBeginning: boolean) {
    await this.consumer.connect()
    await this.consumer.subscribe({ topic, fromBeginning })
    await this.consumer.run({
      eachMessage: async ({ message }) => {
        console.dir(JSON.parse(String(message.value)))
        await ValidateUserService.execute(JSON.parse(String(message.value))).catch((error) =>
          console.log(error)
        )
      },
    })
  }
}

export default new ConsumerService()
