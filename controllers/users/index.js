const signup = require('./signup')
const login = require('./login')
const logout = require('./logout')
const getCurrentUser = require('./getCurrentUser')
const uploadAvatar = require('./avatars')

module.exports = {
  signup,
  login,
  logout,
  getCurrentUser,
  uploadAvatar,
}
