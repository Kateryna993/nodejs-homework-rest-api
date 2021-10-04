const { NotFound } = require('http-errors')
const { sendSuccessResponse } = require('../../helpers')
const { Contact } = require('../../models')

const updateFavorite = async (req, res) => {
  const { contactId } = req.params
  const { favorite } = req.body
  const result = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    {
      new: true,
    }
  )
  if (!result) {
    throw new NotFound('missing field favorite')
  }
  sendSuccessResponse(res, { result })
}

module.exports = updateFavorite
