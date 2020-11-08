const nodemailer = require('nodemailer')

async function sendMailTo(toMail, link) {
    console.log(process.env.MAIL)
    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL,
            pass: process.env.MAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: `HowYourNameSounds <${process.env.MAIL}>`,
        to: toMail,
        subject: 'Confirm your signup',
        text: link
    }

    let mailSent = await transport.sendMail(mailOptions)
    return mailSent
}

module.exports = { sendMailTo }