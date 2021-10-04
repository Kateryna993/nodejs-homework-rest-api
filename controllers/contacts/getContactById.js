const { NotFound } = require('http-errors')
const { sendSuccessResponse } = require('../../helpers')
const { Contact } = require('../../models')

const getContactById = async (req, res) => {
  const { contactId } = req.params
  const result = await Contact.findById(
    contactId,
    '_id name email phone favorite'
  )
  if (!result) {
    throw new NotFound(`Product with id=${contactId} not found`)
  }
  sendSuccessResponse(res, { result })
}

module.exports = getContactById
