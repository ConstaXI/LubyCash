import app from './app'
import connection from "./database/connection";

connection().then(() => console.log('Connection with database established'))

app.listen(3000, () => {
  console.log('ms_emails server started')
})
