const { Schema } = require('mongoose')

const reviewSchema = new Schema(
  {
    content: {
      type: String,
      required: true
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    car_id: {
      type: Schema.Types.ObjectId,
      ref: 'Car'
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    }
  },
  { timestamps: true }
)

module.exports = reviewSchema
