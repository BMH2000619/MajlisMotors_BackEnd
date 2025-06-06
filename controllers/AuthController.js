const { User } = require('../models')
const middleware = require('../middleware')
const upload = require('../middleware/multer-config')

const Register = async (req, res) => {
  try {
    const { email, password, username, firstName, lastName, img } = req.body

    // Check for missing fields
    if (!email || !password || !username || !firstName || !lastName) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    let existingUser = await User.findOne({ email })
    if (existingUser) {
      return res
        .status(400)
        .send('A user with that email has already been registered!')
    }

    let profileImagePath = ''
    if (req.file) {
      profileImagePath = req.file.path.replace('public/', '')
    }

    let passwordDigest = await middleware.hashPassword(password)

    const user = await User.create({
      username,
      firstName,
      lastName,
      email,
      img: req.file ? 'uploads/' + req.file.filename : '',
      passwordDigest
    })

    res.status(200).send({
      id: user._id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      img: user.img
    })

  } catch (error) {
    console.error(error)
    res.status(500).send('Server error during registration')
  }
}

const Login = async (req, res) => {
  try {
    // Extracts the necessary fields from the request body
    const { email, password } = req.body
    // Finds a user by a particular field (in this case, email)
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(401).send({ status: 'Error', msg: 'User not found' })
    }

    // Checks if the password matches the stored digest
    let matched = await middleware.comparePassword(
      password,
      user.passwordDigest
    )
    // If they match, constructs a payload object of values we want on the front end
    if (matched) {
      let payload = {
        id: user.id,
        email: user.email
      }
      // Creates our JWT and packages it with our payload to send as a response
      let token = middleware.createToken(payload)
      return res.status(200).send({ user: payload, token })
    }
    res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
  } catch (error) {
    console.log(error)
    res
      .status(401)
      .send({ status: 'Error', msg: 'An error has occurred logging in!' })
  }
}

const UpdatePassword = async (req, res) => {
  try {
    // Extracts the necessary fields from the request body
    const { oldPassword, newPassword } = req.body
    // Finds a user by a particular field (in this case, the user's id from the URL param)
    let user = await User.findById(req.params.user_id)

    if (!user) {
      return res.status(404).send({ status: 'Error', msg: 'User not found' })
    }

    // Checks if the password matches the stored digest
    let matched = await middleware.comparePassword(
      oldPassword,
      user.passwordDigest
    )
    // If they match, hashes the new password, updates the db with the new digest, then sends the user as a response
    if (matched) {
      let passwordDigest = await middleware.hashPassword(newPassword)
      user = await User.findByIdAndUpdate(
        req.params.user_id,
        { passwordDigest },
        { new: true } // <-- ensures you get the updated user
      )
      let payload = {
        id: user.id,
        email: user.email
      }
      return res
        .status(200)
        .send({ status: 'Password Updated!', user: payload })
    }
    res
      .status(401)
      .send({ status: 'Error', msg: 'Old Password did not match!' })
  } catch (error) {
    console.log(error)
    res.status(401).send({
      status: 'Error',
      msg: 'An error has occurred updating password!'
    })
  }
}

const CheckSession = async (req, res) => {
  const { payload } = res.locals
  res.status(200).send(payload)
}

module.exports = {
  Register,
  Login,
  UpdatePassword,
  CheckSession
}
