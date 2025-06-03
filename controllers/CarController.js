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

const CreateCar = async (req, res) => {
  try {
    const car = await Car.create({ ...req.body })
    res.status(201).send(car)
  } catch (error) {
    console.error(error)
    res.status(500).send('Error creating car')
  }
}

const UpdateCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.car_id, req.body, {
      new: true
    })
    res.status(200).send(car)
  } catch (error) {
    console.error(error)
    res.status(500).send('Error updating car')
  }
}
