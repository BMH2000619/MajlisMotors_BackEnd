const router = require('express').Router()
const controller = require('../controllers/CarController')
const middleware = require('../middleware')

// Public routes
router.get('/', controller.GetCars)
router.get('/:car_id', controller.GetCarById)
