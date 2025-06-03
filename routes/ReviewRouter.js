const router = require('express').Router()
const controller = require('../controllers/ReviewController')
const middleware = require('../middleware')

// Get all reviews
router.get(
  '/',
  middleware.stripToken,
  middleware.verifyToken,
  controller.GetReview
)

// Create a new review (user_id comes from token)
router.post(
  '/',
  middleware.stripToken,
  middleware.verifyToken,
  controller.CreateReview
)

// Update a review
router.put(
  '/:review_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.UpdateReview
)

// Delete a review
router.delete(
  '/:review_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.DeleteReview
)

module.exports = router
