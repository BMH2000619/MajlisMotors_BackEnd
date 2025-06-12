const { Car } = require('../models')
const mongoose = require('mongoose')

// Utility: Check for valid ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id)


const GetCars = async (req, res) => {
  try {
    const cars = await Car.find().populate('brand_id', 'name logo')
    res.status(200).send(cars)
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: 'Failed to fetch cars' })
  }
}


const GetCarById = async (req, res) => {
  try {
    const { car_id } = req.params
    if (!isValidObjectId(car_id)) {
      return res.status(400).send({ error: 'Invalid car ID' })
    }

    const car = await Car.findById(car_id)
      .populate('brand_id', 'name logo')
      .populate('favoritedBy', 'name email image')

    if (!car) {
      return res.status(404).send({ error: 'Car not found' })
    }

    res.status(200).send(car)
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: 'Failed to fetch car' })
  }
}

const GetCarsByBrand = async (req, res) => {
  try {
    const { brand_id } = req.params
    const cars = await Car.find({ brand_id }).populate('brand_id', 'name logo')
    res.status(200).send(cars)
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: 'Failed to fetch cars by brand' })
  }
}


const CreateCar = async (req, res) => {
  try {
    const { name, type, year, description, image, brand_id } = req.body
    if (!name || !type || !year || !description || !image || !brand_id) {
      return res.status(400).send({ error: 'Missing required fields' })
    }

    const car = await Car.create(req.body)
    res.status(201).send(car)
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: 'Failed to create car' })
  }
}


const UpdateCar = async (req, res) => {
  try {
    const { car_id } = req.params
    if (!isValidObjectId(car_id)) {
      return res.status(400).send({ error: 'Invalid car ID' })
    }

    const car = await Car.findByIdAndUpdate(car_id, req.body, { new: true })
    if (!car) {
      return res.status(404).send({ error: 'Car not found' })
    }

    res.status(200).send(car)
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: 'Failed to update car' })
  }
}


const DeleteCar = async (req, res) => {
  try {
    const { car_id } = req.params
    if (!isValidObjectId(car_id)) {
      return res.status(400).send({ error: 'Invalid car ID' })
    }

    const deleted = await Car.findByIdAndDelete(car_id)
    if (!deleted) {
      return res.status(404).send({ error: 'Car not found' })
    }

    res.send({
      msg: 'Car deleted',
      payload: car_id,
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
  DeleteCar,
  GetCarsByBrand
}
