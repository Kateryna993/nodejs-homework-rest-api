const { User } = require('../../models')
const { Conflict } = require('http-errors')
const { v4 } = require('uuid')
const { sendEmail } = require('../../helpers')

const signup = async (req, res) => {
  const { email, password, avatar } = req.body
  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict('Email in use')
  }
  const verifyToken = v4()
  const newUser = new User({ email, verifyToken })

  newUser.setPassword(password)
  newUser.setAvatar(avatar)
  await newUser.save()

  console.log(newUser)

  const data = {
    to: email,
    subject: 'Registration confirmation',
    html: `<a href="http://localhost:3000/api/users/verify/${verifyToken}" target="_blank">Confirm your email</a>`,
  }
  await sendEmail(data)

  res.status(201).json({
    status: 'success',
    code: 201,
    message: 'Successfully registered',
  })
}

module.exports = signup
