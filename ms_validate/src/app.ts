import express from 'express'
import ConsumerService from "./Services/ConsumerService";

const app = express()

app.use(express.json())

const consumer = new ConsumerService({ groupId: 'mail-group' });

consumer.consume({
    topic: 'changed-status-handler',
    fromBeginning: true
}).then(() => console.log('%c Consumer ready.', 'background: #222; color: #bada55'))

export default app
