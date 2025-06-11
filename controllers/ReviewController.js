const { Review, Car, User } = require('../models')
const mongoose = require('mongoose')

// Helper
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id)

// Get all reviews
const GetReview = async (req, res) => {
  try {
    const reviews = await Review.find({})
      .populate('user_id', 'username firstName lastName email img')
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
    const user_id = res.locals.payload.id // safer than trusting client
    const { comment, car_id, rating } = req.body

    const existing = await Review.findOne({ user_id, car_id })
    if (existing) {
      return res
        .status(400)
        .send({ error: 'You have already reviewed this car' })
    }

    if (!comment || !car_id || rating === undefined) {
      return res.status(400).send({ error: 'Missing required fields' })
    }

    if (!isValidObjectId(user_id) || !isValidObjectId(car_id)) {
      return res.status(400).send({ error: 'Invalid user or car ID' })
    }

    const review = await Review.create({ comment, user_id, car_id, rating })
    res.status(201).send(review)
  } catch (error) {
    console.error(error)
    res.status(500).send({ status: 'Error', msg: 'Failed to create review' })
  }
}

// Update a review
const UpdateReview = async (req, res) => {
  try {
    const { review_id } = req.params
    if (!isValidObjectId(review_id)) {
      return res.status(400).send({ error: 'Invalid review ID' })
    }

    const review = await Review.findById(review_id)
    if (!review) {
      return res.status(404).send({ msg: 'Review not found' })
    }
    if (review.user_id.toString() !== res.locals.payload.id) {
      return res.status(403).send({ error: 'Unauthorized' })
    }

    const updated = await Review.findByIdAndUpdate(review_id, req.body, {
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
    const { review_id } = req.params
    if (!isValidObjectId(review_id)) {
      return res.status(400).send({ error: 'Invalid review ID' })
    }

    const review = await Review.findById(review_id)
    if (!review) {
      return res.status(404).send({ msg: 'Review not found' })
    }
    if (review.user_id.toString() !== res.locals.payload.id) {
      return res.status(403).send({ error: 'Unauthorized' })
    }

    const deleted = await Review.findByIdAndDelete(review_id)

    if (!deleted) {
      return res.status(404).send({ msg: 'Review not found' })
    }

    res
      .status(200)
      .send({ msg: 'Review Deleted', payload: review_id, status: 'Ok' })
  } catch (error) {
    console.error(error)
    res.status(500).send({ status: 'Error', msg: 'Failed to delete review' })
  }
}

// Get all reviews for a car
const GetReviewsByCar = async (req, res) => {
  try {
    const { car_id } = req.params;
    if (!isValidObjectId(car_id)) {
      return res.status(400).send({ error: 'Invalid car ID' });
    }
    const reviews = await Review.find({ car_id })
      .populate('user_id', 'username firstName lastName email img');
    res.status(200).send(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: 'Error', msg: 'Failed to fetch reviews' });
  }
};


module.exports = {
  GetReview,
  CreateReview,
  UpdateReview,
  DeleteReview,
  GetReviewsByCar
}

