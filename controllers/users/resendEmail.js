const { User } = require('../../models')
const { BadRequest, NotFound } = require('http-errors')
const { sendEmail } = require('../../helpers')

const resendEmail = async (req, res) => {
  const { email } = req.body
  if (!email) {
    throw new BadRequest('missing required field email')
  }

  const user = await User.findOne({ email })
  if (!user) {
    throw new NotFound('User not found')
  }
  if (user.verify) {
    throw new BadRequest('Verification has already been passed')
  }

  const resendVerifyEmail = {
    to: email,
    subject: 'Registration confirmation resent',
    html: `<a href="http://localhost:3000/api/users/verify/${user.verifyToken}" target="_blank">Confirm your email</a>`,
  }
  await sendEmail(resendVerifyEmail)
  res.json({
    status: 'success',
    code: 200,
    message: 'Verification email sent',
  })
}

module.exports = resendEmail
