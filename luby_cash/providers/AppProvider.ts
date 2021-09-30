import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import ConsumerService from 'App/Services/Kafka/ConsumerService'

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
  }

  public async boot() {
    await new ConsumerService('response-group').execute('handle-response', true)

    console.log('Consumer ready.')
  }

  public async ready() {}

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
