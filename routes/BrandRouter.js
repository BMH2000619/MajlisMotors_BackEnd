const router = require('express').Router()
const controller = require('../controllers/BrandController')
const middleware = require('../middleware')

// GET all brands
router.get('/', controller.GetBrands)

// GET a single brand by ID
router.get('/:brand_id', controller.GetBrandById)