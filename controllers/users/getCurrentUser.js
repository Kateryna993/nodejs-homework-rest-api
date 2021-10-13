const { Contact } = require('../../models')

const getCurrentUser = async (req, res) => {
  const { _id, email, subscription } = req.user
  await Contact.find({ owner: _id }, '_id email subscription')
  res.json({
    status: 'success',
    code: 200,
    data: {
      email,
      subscription,
    },
  })
}

module.exports = getCurrentUser
