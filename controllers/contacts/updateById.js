const { NotFound } = require('http-errors')
const { sendSuccessResponse } = require('../../helpers')
const { Contact } = require('../../models')

const updateById = async (req, res) => {
  const { contactId } = req.params
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  })
  if (!result) {
    throw new NotFound(`Product with id=${contactId} not found`)
  }
  sendSuccessResponse(res, { result })
}

module.exports = updateById
