const { Unauthorized, BadRequest } = require('http-errors')
const { User } = require('../../models')

const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email }, '_id email password verify')
  if (!user || !user.comparePassword(password)) {
    throw new Unauthorized('Email or password is wrong')
  }
  if (!user.verify) {
    throw new BadRequest('Email is not verified!')
  }
  const token = user.createToken()
  await User.findByIdAndUpdate(user._id, { token })
  res.json({
    status: 'success',
    code: 200,
    data: {
      token,
    },
  })
}

module.exports = login
