import express from 'express'
import consumer from "./services/kafka/consumer";

const app = express()

app.use(express.json())

consumer.execute('send-mail', true).then(() => console.log('Consumer ready.'))

export default app
