const router = require('express').Router()
const controller = require('../controllers/ReviewController')
const middleware = require('../middleware')

// Get all reviews (optionally could add query params like ?car_id=xyz)
router.get('/', controller.GetAllReviews)

// Get a single review by ID
router.get('/:review_id', controller.GetReviewById)

// Create a new review (requires authentication)
router.post(
  '/',
  middleware.stripToken,
  middleware.verifyToken,
  controller.CreateReview
)

// Update a review by ID (requires authentication)
router.put(
  '/:review_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.UpdateReview
)

// Delete a review by ID (requires authentication)
router.delete(
  '/:review_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.DeleteReview
)

module.exports = router
