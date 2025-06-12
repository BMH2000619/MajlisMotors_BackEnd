const router = require('express').Router()
const controller = require('../controllers/BrandController')
const middleware = require('../middleware')


router.get('/', controller.GetBrands)

router.get('/:brand_id', controller.GetBrandById)

router.get('/:brand_id/cars', controller.GetCarsByBrand)

router.post(
  '/',
  middleware.stripToken,
  middleware.verifyToken,
  controller.CreateBrand
)

router.put(
  '/:brand_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.UpdateBrand
)

router.delete(
  '/:brand_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.DeleteBrand
)

module.exports = router
