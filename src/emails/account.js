const sgMail = require('@sendgrid/mail')

const sendgridAPIKEY = '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'

sgMail.setApiKey(sendgridAPIKEY)

const msg = {
    to: 'eagboka@otr.tg', // Change to your recipient
    from: 'opentech.consult@gmail.com', // Change to your verified sender
    subject: 'Sending with SendGrid is Fun',
    text: 'Hi its me sandro ',
    html: '<strong>Just use sendgrid to send you a message using node.js</strong>',
}

sgMail.send(msg)
    .then(() => { console.log('Email sent')})
    .catch((err) => { console.error(err)})
