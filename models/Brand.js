const { Schema } = require('mongoose')

const brandSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    founded: {
      type: Date,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    logo: {
      type: String
    }
  },
  { timestamps: true }
)

module.exports = brandSchema
