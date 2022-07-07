const mailer = require('nodemailer');
class MailService {
    constructor() {
        this.transporter = mailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secureConnection: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
            tls: {
                ciphers:'SSLv3'
            }
        })
    }

    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to: to,
            subject: 'Account activation',
            text: '',
            html: `
                <div>
                    <h1>For the activation visit the following link</h1>
                    <a href="${link}">${link}<a/>    
                </div>
            `
        })
    }
}

module.exports = new MailService();