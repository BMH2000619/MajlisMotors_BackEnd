const { Brand, Car } = require('../models')
const mongoose = require('mongoose')

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id)

const GetBrands = async (req, res) => {
  try {
    const brands = await Brand.find()
    res.status(200).send(brands)
  } catch (error) {
    console.error(error)
    res.status(500).send('Error getting brands')
  }
}

const GetBrandById = async (req, res) => {
  try {
    const { brand_id } = req.params
    if (!isValidObjectId(brand_id)) {
      return res.status(400).send('Invalid brand ID')
    }
    const brand = await Brand.findById(brand_id)
    if (!brand) {
      return res.status(404).send('Brand not found')
    }
    res.status(200).send(brand)
  } catch (error) {
    console.error(error)
    res.status(500).send('Error getting brand by ID')
  }
}

const GetCarsByBrand = async (req, res) => {
  try {
    const { brand_id } = req.params
    if (!isValidObjectId(brand_id)) {
      return res.status(400).send('Invalid brand ID')
    }
    const cars = await Car.find({ brand_id })
    res.status(200).send(cars)
  } catch (error) {
    console.error(error)
    res.status(500).send('Error getting cars for brand')
  }
}

const CreateBrand = async (req, res) => {
  try {
    const { name, country, founded, description, logo } = req.body
    if (!name || !country || !founded || !description) {
      return res.status(400).send('Missing required brand fields')
    }
    const brand = await Brand.create({
      name,
      country,
      founded,
      description,
      logo
    })
    res.status(201).send(brand)
  } catch (error) {
    console.error(error)
    res.status(500).send('Error creating brand')
  }
}

const UpdateBrand = async (req, res) => {
  try {
    const { brand_id } = req.params
    if (!isValidObjectId(brand_id)) {
      return res.status(400).send('Invalid brand ID')
    }
    const brand = await Brand.findByIdAndUpdate(brand_id, req.body, {
      new: true
    })
    if (!brand) {
      return res.status(404).send('Brand not found')
    }
    res.status(200).send(brand)
  } catch (error) {
    console.error(error)
    res.status(500).send('Error updating brand')
  }
}

const DeleteBrand = async (req, res) => {
  try {
    const { brand_id } = req.params
    if (!isValidObjectId(brand_id)) {
      return res.status(400).send('Invalid brand ID')
    }
    const deleted = await Brand.findByIdAndDelete(brand_id)
    if (!deleted) {
      return res.status(404).send('Brand not found')
    }
    res.send({ msg: 'Brand deleted', id: brand_id })
  } catch (error) {
    console.error(error)
    res.status(500).send('Error deleting brand')
  }
}

module.exports = {
  GetBrands,
  GetBrandById,
  GetCarsByBrand,
  CreateBrand,
  UpdateBrand,
  DeleteBrand
}
