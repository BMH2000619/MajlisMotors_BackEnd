const { Review, Car, User } = require('../models')

// Get all reviews (optionally populate user and car details)
const GetReview = async (req, res) => {
  try {
    const reviews = await Review.find({})
      .populate('user_id', 'name email image')
      .populate('car_id', 'name year image')
    res.status(200).send(reviews)
  } catch (error) {
    console.error(error)
    res.status(500).send({ status: 'Error', msg: 'Failed to fetch reviews' })
  }
}

// Create a review
const CreateReview = async (req, res) => {
  try {
    const { content, user_id, car_id, rating } = req.body

    if (!content || !user_id || !car_id || rating === undefined) {
      return res.status(400).send({ error: 'Missing required fields' })
    }

    const review = await Review.create({ content, user_id, car_id, rating })
    res.status(201).send(review)
  } catch (error) {
    console.error(error)
    res.status(500).send({ status: 'Error', msg: 'Failed to create review' })
  }
}

const UpdateReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.post_id, req.body, {
      new: true
    })
    res.send(review)
  } catch (error) {
    throw error
  }
}

const DeleteReview = async (req, res) => {
  try {
    await Review.deleteOne({ _id: req.params.post_id })
    res.send({ msg: 'Review Deleted', payload: req.params.post_id, status: 'Ok' })
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetReview,
  CreateReview,
  UpdateReview,
  DeleteReview,
}
