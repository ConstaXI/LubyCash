import { Kafka } from 'kafkajs'

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
      },
    })
  }
}

export default new ConsumerService()
