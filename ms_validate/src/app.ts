import express from 'express'
import ConsumerService from './services/ConsumerService'

const app = express()

app.use(express.json())

ConsumerService.execute('handle-new-user', true).then(() => console.log('Consumer ready.')).catch(error => console.log(error))

export default app
