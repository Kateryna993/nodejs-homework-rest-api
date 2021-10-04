const { Schema, model } = require('mongoose')
const Joi = require('joi')

const phoneRegexp = /^[0-9]/

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
      min: 2,
      max: 10,
    },
    email: {
      type: String,
      required: [true, 'The email of contact is required'],
      min: 5,
    },
    phone: {
      type: String,
      required: [true, 'The phone of contact is required'],
      match: phoneRegexp,
      min: 5,
      max: 10,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
)

const joiSchema = Joi.object({
  name: Joi.string().min(2).max(10).required(),
  email: Joi.string().email().min(5).required(),
  phone: Joi.string().pattern(phoneRegexp).min(5).max(12).required(),
  favorite: Joi.boolean(),
})

const updateFavoriteJoiSchema = Joi.object({
  favorite: Joi.boolean(),
})

const Contact = model('contact', contactSchema)

module.exports = {
  joiSchema,
  Contact,
  updateFavoriteJoiSchema,
}
