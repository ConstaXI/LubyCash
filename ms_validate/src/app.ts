import express from 'express'
import ConsumerService from './services/ConsumerService'

const app = express()

app.use(express.json())

const consumer = new ConsumerService('mail-group')

consumer.execute('handle-new-user', true).then(() => console.log('Consumer ready.'))

export default app
