const sgMail = require('@sendgrid/mail')
require('dotenv').config()

const { SENGRID_KEY } = process.env

sgMail.setApiKey(SENGRID_KEY)

// const email = {
//   to: 'dekatty@gmail.com',
//   from: 'dekatty@gmail.com',
//   subject: 'New request from the website',
//   html: '<p><strong>Client email: </strong> dekatty@gmail.com</p>',
// }

const sendEmail = async (data) => {
  const email = { ...data, from: 'dekatty@gmail.com' }
  await sgMail.send(email)
}

// sgMail
//   .send(email)
//   .then(() => console.log('Email sent'))
//   .catch((error) => console.log(error.message))

module.exports = sendEmail
