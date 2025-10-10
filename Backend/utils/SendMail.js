const nodemailer = require('nodemailer')
const sendMail = async (options)=>{
    console.log('receivign optoins for mail send ',{...options})
    const transmitter = nodemailer.createTransport({
        host:process.env.SMTP_HOST,
        port:process.env.SMTP_PORT,
        secure:false,
        auth:{
            user:process.env.SMTP_MAIL,
            pass:process.env.SMTP_PASSWORD
        }
    })

    const mailOptions = {
        from:process.env.SMTP_MAIL,
        to:options.to,
        subject:options.subject,
        text:options.text
    }

    await transmitter.sendMail(mailOptions)
}

module.exports = sendMail