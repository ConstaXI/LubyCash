/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/

import ConsumerService from 'App/Services/Kafka/ConsumerService'

ConsumerService.execute('handle-response', true).catch((error) => console.log(error))
