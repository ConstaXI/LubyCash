import { Kafka, Producer, TopicMessages } from 'kafkajs'

class ProducerService {
  private producer: Producer

  constructor() {
    const kafka = new Kafka({
      clientId: 'luby_cash_producer',
      brokers: ['localhost:9092'],
    })

    this.producer = kafka.producer()
  }

  public async execute({ topic, messages }: TopicMessages) {
    await this.producer.connect()
    await this.producer.send({
      topic,
      messages,
    })
    await this.producer.disconnect()
  }
}

export default new ProducerService()
