const express = require('express')
const { joiSchema } = require('../../models/user')
const {
  controllerWrapper,
  validation,
  authenticate,
} = require('../../middlewares')
const { users: ctrl } = require('../../controllers')
const router = express.Router()

/* 1. Регистрация нового пользователя
2. Аутентификация (логин) зарегистрированного пользователя
3. Авторизация аутентифицированого (зашедшего на сайт) пользоватля
4. Выход */

router.post('/signup', validation(joiSchema), controllerWrapper(ctrl.signup))
router.post('/login', validation(joiSchema), controllerWrapper(ctrl.login))
router.get('/logout', authenticate, controllerWrapper(ctrl.logout))
router.get('/current', authenticate, controllerWrapper(ctrl.getCurrentUser))
module.exports = router
