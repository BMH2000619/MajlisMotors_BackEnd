const { Car } = require('../models')

// GET all cars (with optional brand population)
const GetCars = async (req, res) => {
  try {
    const cars = await Car.find().populate('brand_id', 'name logo')
    res.status(200).send(cars)
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: 'Failed to fetch cars' })
  }
}

// GET car by ID (with brand and favorites info)
const GetCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.car_id)
      .populate('brand_id', 'name logo')
      .populate('favorites', 'name email image')

    if (!car) {
      return res.status(404).send({ error: 'Car not found' })
    }

    res.status(200).send(car)
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: 'Failed to fetch car' })
  }
}

// CREATE a new car
const CreateCar = async (req, res) => {
  try {
    const car = await Car.create(req.body)
    res.status(201).send(car)
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: 'Failed to create car' })
  }
}

// UPDATE an existing car
const UpdateCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.car_id, req.body, {
      new: true
    })
    res.status(200).send(car)
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: 'Failed to update car' })
  }
}

// DELETE a car
const DeleteCar = async (req, res) => {
  try {
    await Car.deleteOne({ _id: req.params.car_id })
    res.send({
      msg: 'Car deleted',
      payload: req.params.car_id,
      status: 'Ok'
    })
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: 'Failed to delete car' })
  }
}

module.exports = {
  GetCars,
  GetCarById,
  CreateCar,
  UpdateCar,
  DeleteCar
}
