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
