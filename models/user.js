const { Schema, model } = require('mongoose')
const Joi = require('joi')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const gravatar = require('gravatar')

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: {
      type: String,
      default: null,
    },
    avatar: {
      type: String,
      default: function () {
        return gravatar.url(this.email, { s: '250' }, true)
      },
    },
  },
  { versioKey: false, timestamps: true }
)

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

userSchema.methods.setAvatar = function (avatar) {
  this.avatar = avatar
}

const { SECRET_KEY } = process.env

userSchema.methods.createToken = function () {
  const payload = {
    _id: this._id,
  }
  return jwt.sign(payload, SECRET_KEY)
}

const joiSchema = Joi.object({
  password: Joi.string().required().min(6),
  email: Joi.string().required(),
})

const User = model('user', userSchema)

module.exports = {
  User,
  joiSchema,
}
