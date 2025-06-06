const { Schema } = require('mongoose')

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    passwordDigest: { type: String, required: true },
    img: { type: String }
  },
  { timestamps: true }
)

module.exports = userSchema
