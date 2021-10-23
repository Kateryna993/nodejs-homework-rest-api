const { User } = require('../../models')
const { Conflict } = require('http-errors')
// const gravatar = require('gravatar')
// const bcrypt = require('bcryptjs')

const signup = async (req, res) => {
  const { email, password, avatar } = req.body
  const user = await User.findOne({ email })
  //   console.log(user)
  if (user) {
    throw new Conflict('Email in use')
  }
  const newUser = new User({ email })

  // const avatar = gravatar.url(email, { s: '250' }, true)

  newUser.setPassword(password)
  newUser.setAvatar(avatar)
  await newUser.save()

  console.log(newUser)
  // const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  // const newUser = { email, password: hashPassword, avatar }
  // const result = await User.create(newUser)

  // const compareResult = bcrypt.compareSync(password, hashPassword)
  // console.log(result)
  res.status(201).json({
    status: 'success',
    code: 201,
    message: 'Successfully registered',
    // data: {
    //   result,
    // },
  })
}

module.exports = signup
