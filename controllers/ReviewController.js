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

// Update a review
const UpdateReview = async (req, res) => {
  try {
    const { post_id } = req.params
    const updated = await Review.findByIdAndUpdate(post_id, req.body, {
      new: true
    })

    if (!updated) {
      return res.status(404).send({ msg: 'Review not found' })
    }

    res.status(200).send(updated)
  } catch (error) {
    console.error(error)
    res.status(500).send({ status: 'Error', msg: 'Failed to update review' })
  }
}

// Delete a review
const DeleteReview = async (req, res) => {
  try {
    const { post_id } = req.params
    const deleted = await Review.findByIdAndDelete(post_id)

    if (!deleted) {
      return res.status(404).send({ msg: 'Review not found' })
    }

    res
      .status(200)
      .send({ msg: 'Review Deleted', payload: post_id, status: 'Ok' })
  } catch (error) {
    console.error(error)
    res.status(500).send({ status: 'Error', msg: 'Failed to delete review' })
  }
}

module.exports = {
  GetReview,
  CreateReview,
  UpdateReview,
  DeleteReview
}
