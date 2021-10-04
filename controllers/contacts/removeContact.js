const { NotFound } = require('http-errors')
const { sendSuccessResponse } = require('../../helpers')
const { Contact } = require('../../models')

const removeContact = async (req, res) => {
  const { contactId } = req.params
  const result = await Contact.findByIdAndDelete(contactId)
  if (!result) {
    throw new NotFound(`Product with id=${contactId} not found`)
  }
  sendSuccessResponse(res, { message: 'Successfully deleted' })
}

module.exports = removeContact
