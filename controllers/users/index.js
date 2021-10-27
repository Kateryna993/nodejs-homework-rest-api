const signup = require('./signup')
const verify = require('./verify')
const resendEmail = require('./resendEmail')
const login = require('./login')
const logout = require('./logout')
const getCurrentUser = require('./getCurrentUser')
const uploadAvatar = require('./avatars')

module.exports = {
  signup,
  verify,
  resendEmail,
  login,
  logout,
  getCurrentUser,
  uploadAvatar,
}
