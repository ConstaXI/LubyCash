import nodemailer, { Transporter } from 'nodemailer'
import hbs from 'nodemailer-express-handlebars'
import { promisify } from 'util'
import fs from 'fs'
import handlebars from 'handlebars'

interface Mail {
  email: string
  status: string
}

class SendMail {
  private mailer: Transporter

  constructor() {
    this.mailer = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      secure: false,
      auth: {
        user: '0f5936733b0f43',
        pass: 'd336d59fdf3702',
      },
    })
  }

  public async execute({ email, status }: Mail) {
    const readFile = promisify(fs.readFile)

    this.mailer.use(
      'compile',
      hbs({
        viewEngine: {
          extname: '.edge',
        },
        viewPath: 'src/views/emails',
        extName: '.edge',
      })
    )

    const html = await readFile('src/views/emails/evaluation_status.edge', 'utf8')
    const template = handlebars.compile(html)
    const htmlToSend = template({ status: status })

    this.mailer.sendMail(
      {
        from: 'davi@email.com',
        to: email,
        subject: 'Status da avaliação',
        html: htmlToSend,
        attachments: [{
          filename: 'image-1.png',
          path: 'src/views/emails/images/image-1.png',
          cid: 'theImageIWant'
        }]
      },
      (error) => {
        if (error) {
          console.log(error)
        }
        console.log(`Successfully sent email to ${email}`)
      }
    )
  }
}

export default new SendMail()
