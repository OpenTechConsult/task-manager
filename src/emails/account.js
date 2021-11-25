const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = async (email, name) => {
    const msg = {
        to: email, // Change to your recipient
        from: 'opentech.consult@gmail.com', // Change to your verified sender
        subject: 'Sending with SendGrid is Fun',
        text: `Welcome to the app, ${name}, let us know how you get along with the user app`
    }
    
    sgMail.send(msg)
        .then(() => { console.log('Email sent with SendGrid')})
        .catch((err) => { console.error(err)})
}

const sendGoodbyeEmail = (email, name) => {
    const msg = {
        to: email, // Change to your recipient
        from: 'opentech.consult@gmail.com', // Change to your verified sender
        subject: 'Sending with SendGrid is Fun',
        text: `Goodbye, ${name}, is there anything that we can do to keep you onboard?`
    }
    sgMail.send(msg)
        .then(() => { console.log('Goodbye Email sent')})
        .catch((err) => { console.error(err)})
}

module.exports = {
    sendWelcomeEmail,
    sendGoodbyeEmail
}




