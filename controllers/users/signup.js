const { User } = require('../../models')
const { Conflict } = require('http-errors')
// const bcrypt = require('bcryptjs')

const signup = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  //   console.log(user)
  if (user) {
    throw new Conflict('Email in use')
    // res.status(409).json({
    //   status: 'error',
    //   code: 409,
    //   message: 'Email in use',
    // })
  }
  const newUser = new User({ email })
  newUser.setPassword(password)
  await newUser.save()
  //   const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  //   const newUser = { email, password: hashPassword }
  //   const result = await User.create(newUser)

  //   const compareResult = bcrypt.compareSync(password, hashPassword)
  //   console.log(result)
  res.status(201).json({
    status: 'success',
    code: 201,
    message: 'Successfully registered',
  })
}

module.exports = signup
