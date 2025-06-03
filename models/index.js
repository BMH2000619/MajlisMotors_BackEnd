const mongoose = require('mongoose')
const userSchema = require('./User')
const reviewSchema = require('./Review')

const User = mongoose.model('User', userSchema)
const Review = mongoose.model('Review', reviewSchema)


module.exports = {
  User,
  Review,
}