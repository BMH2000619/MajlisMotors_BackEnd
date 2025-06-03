const router = require('express').Router()
const controller = require('../controllers/BrandController')
const middleware = require('../middleware')

// GET all brands
router.get('/', controller.GetBrands)

// GET a single brand by ID
router.get('/:brand_id', controller.GetBrandById)

// CREATE a new brand (protected route)
router.post(
  '/',
  middleware.stripToken,
  middleware.verifyToken,
  controller.CreateBrand
)

// UPDATE a brand by ID (protected route)
router.put(
  '/:brand_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.UpdateBrand
)

// DELETE a brand by ID (protected route)
router.delete(
  '/:brand_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.DeleteBrand
)

module.exports = router