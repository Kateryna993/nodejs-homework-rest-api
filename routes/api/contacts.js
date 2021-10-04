const express = require('express')
const { joiSchema, updateFavoriteJoiSchema } = require('../../models/contact')
const { controllerWrapper, validation } = require('../../middlewares')
const { contacts: ctrl } = require('../../controllers')

const router = express.Router()

router.get('/', controllerWrapper(ctrl.listContacts))

router.get('/:contactId', controllerWrapper(ctrl.getContactById))

router.post('/', validation(joiSchema), controllerWrapper(ctrl.addContact))

router.delete('/:contactId', controllerWrapper(ctrl.removeContact))

router.put(
  '/:contactId',
  validation(joiSchema),
  controllerWrapper(ctrl.updateById)
)

router.patch(
  '/:contactId/favorite',
  validation(updateFavoriteJoiSchema),
  controllerWrapper(ctrl.updateFavorite)
)

module.exports = router
