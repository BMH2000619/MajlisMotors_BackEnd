const { Review } = require('../models')

const GetReview = async (req, res) => {
  try {
    const reviews = await Review.find({})
    res.status(200).send(reviews)
  } catch (error) {
    throw error
  }
}

const CreateReview = async (req, res) => {
  try {
    const review = await Review.create({ ...req.body })
    res.send(review)
  } catch (error) {
    throw error
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
