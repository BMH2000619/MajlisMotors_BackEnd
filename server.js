const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const multer = require('multer')
const path = require('path')

const AuthRouter = require('./routes/AuthRouter')
const BrandRouter = require('./routes/BrandRouter')
const CarRouter = require('./routes/CarRouter')
const ReviewRouter = require('./routes/ReviewRouter')

const PORT = process.env.PORT || 3001

const db = require('./db')

const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')))

app.use('/auth', AuthRouter)
app.use('/brands', BrandRouter)
app.use('/cars', CarRouter)
app.use('/reviews', ReviewRouter)

app.use('/', (req, res) => {
  res.send(`Connected!`)
})

app.listen(PORT, () => {
  console.log(`Running Express server on Port ${PORT} . . .`)
})
