const { User } = require('../../models')
const { NotFound } = require('http-errors')

const verify = async (req, res) => {
  const { verifyToken } = req.params
  const user = await User.findOne({ verifyToken })
  if (!user) {
    throw new NotFound('User not found')
  }
  await User.findByIdAndUpdate(user._id, { verifyToken: null, verify: true })
  res.json({
    status: 'success',
    code: 200,
    message: 'Verification successfull',
  })
}

module.exports = verify
