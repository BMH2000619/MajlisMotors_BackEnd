const { Car } = require('../models')

const GetCars = async (req, res) => {
  try {
    const cars = await Car.find().populate('brand_id')
    res.status(200).send(cars)
  } catch (error) {
    console.error(error)
    res.status(500).send('Error getting cars')
  }
}

const GetCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.car_id).populate('brand_id')
    res.status(200).send(car)
  } catch (error) {
    console.error(error)
    res.status(500).send('Error getting car by ID')
  }
}