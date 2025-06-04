const router = require('express').Router()
const controller = require('../controllers/AuthController')
const middleware = require('../middleware')
const upload = require('../middleware/multer-config')

router.post('/login', controller.Login)
router.post('/register', upload.single('img'), controller.Register)
router.put(
  '/update/:user_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.UpdatePassword
)
router.get(
  '/session',
  middleware.stripToken,
  middleware.verifyToken,
  controller.CheckSession
)

module.exports = router
