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