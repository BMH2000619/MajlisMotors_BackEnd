const mongoose = require('mongoose')
const userSchema = require('./User')
const reviewSchema = require('./Review')

const User = mongoose.model('User', userSchema)
const Review = mongoose.model('Review', reviewSchema)
const Car = mongoose.model('Car', carSchema)
const Brand = mongoose.model('Brand', brandSchema)

module.exports = {
  User,
  Review,
  Car,
  Brand
}
