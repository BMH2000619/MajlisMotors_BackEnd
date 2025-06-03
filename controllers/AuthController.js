const { User } = require("../models")
const middleware = require("../middleware")

const Register = async (req, res) => {
  try {
    // Extracts the necessary fields from the request body
    const { email, password, name } = req.body
    // Hashes the provided password
    let passwordDigest = await middleware.hashPassword(password)
    // Checks if there has already been a user registered with that email
    let existingUser = await User.findOne({ email })
    if (existingUser) {
      return res
        .status(400)
        .send("A user with that email has already been registered!")
    } else {
      // Creates a new user
      const user = await User.create({ name, email, passwordDigest })
      // Sends the user as a response
      res.status(200).send(user)
    }
  } catch (error) {
    throw error
  }
}
