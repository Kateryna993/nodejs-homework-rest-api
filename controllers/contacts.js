const { NotFound } = require('http-errors')
const { sendSuccessResponse } = require('../helpers')
const { Contact } = require('../models')

const listContacts = async (req, res) => {
  const result = await Contact.find({}, '_id name email phone favorite')
  sendSuccessResponse(res, { result })
}

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

const addContact = async (req, res) => {
  const result = await Contact.create(req.body)
  sendSuccessResponse(res, { result }, 201)
}

const removeContact = async (req, res) => {
  const { contactId } = req.params
  const result = await Contact.findByIdAndDelete(contactId)
  if (!result) {
    throw new NotFound(`Product with id=${contactId} not found`)
  }
  sendSuccessResponse(res, { message: 'Successfully deleted' })
}

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

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateById,
  updateFavorite,
}
