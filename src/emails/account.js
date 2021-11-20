const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// Goal: Pull JWT secret and database URL into env vars
// 1. Create two new env variables: JWT_SECRET and MONGODB_URL
// 2. Setup values for each in the dev env file
// 3. Swap out three hardcoded values
// 4. Test your work. Create new user and get their profile

const sendWelcomeEmail = (email, name) => {
    const msg = {
        to: email, // Change to your recipient
        from: 'opentech.consult@gmail.com', // Change to your verified sender
        subject: 'Sending with SendGrid is Fun',
        text: `Welcome to the app, ${name}, let us know how you get along with the user app`
    }
    
    sgMail.send(msg)
        .then(() => { console.log('Email sent')})
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




