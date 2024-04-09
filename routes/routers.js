const router = require('express').Router()
const authMiddleware = require('../middlewares/authMiddleware')
const controller = require('../controllers/userController')



router.post('/signup',controller.signup)
router.post('/login',controller.login)
router.post('/profile', authMiddleware, controller.profile)

module.exports = router