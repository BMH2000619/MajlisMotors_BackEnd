const { Brand, Car } = require('../models')

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
    const brand = await Brand.findById(req.params.brand_id)
    res.status(200).send(brand)
  } catch (error) {
    console.error(error)
    res.status(500).send('Error getting brand by ID')
  }
}

const GetCarsByBrand = async (req, res) => {
  try {
    const cars = await Car.find({ brand_id: req.params.brand_id })
    res.status(200).send(cars)
  } catch (error) {
    console.error(error)
    res.status(500).send('Error getting cars for brand')
  }
}

const CreateBrand = async (req, res) => {
  try {
    const brand = await Brand.create({ ...req.body })
    res.status(201).send(brand)
  } catch (error) {
    console.error(error)
    res.status(500).send('Error creating brand')
  }
}

const UpdateBrand = async (req, res) => {
  try {
    const brand = await Brand.findByIdAndUpdate(req.params.brand_id, req.body, {
      new: true
    })
    res.status(200).send(brand)
  } catch (error) {
    console.error(error)
    res.status(500).send('Error updating brand')
  }
}