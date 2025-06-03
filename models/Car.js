const { Schema } = require('mongoose')

const carSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    year: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    brand_id: {
      type: Schema.Types.ObjectId,
      ref: 'Brand'
    },
    favorites: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
)

module.exports = carSchema
