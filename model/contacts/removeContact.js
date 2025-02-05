const listContacts = require('./listContacts')
const updateContacts = require('./updateContacts')

const removeContact = async (contactId) => {
  const contacts = await listContacts()
  const contactIndex = contacts.findIndex(
    (item) => item.id.toString() === contactId
  )
  if (contactIndex === -1) {
    return null
  }
  contacts.splice(contactIndex, 1)
  await updateContacts(contacts)

  return 'Successfully removed'
}

module.exports = removeContact
