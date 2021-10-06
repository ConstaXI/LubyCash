import express from 'express'
import 'reflect-metadata'
import './container'
import routes from './routes'
import './database/connection'

const app = express()

app.use(express.json())
app.use(routes)

export default app
