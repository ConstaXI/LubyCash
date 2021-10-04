import express from 'express'
import 'reflect-metadata'
import './container'
import ConsumerService from './services/ConsumerService'
import routes from './routes'
import connection from './database/connection'

connection().then(() => console.log('Connection with database established'))

const app = express()

app.use(express.json())
app.use(routes)

ConsumerService.execute('handle-new-user', true)
  .then(() => console.log('Consumer ready.'))
  .catch((error) => console.log(error))

export default app
