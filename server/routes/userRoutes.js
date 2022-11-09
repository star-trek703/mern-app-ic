const express = require('express')
const { signup, signin, profile } = require('../controllers/userController')
const { auth } = require('../middlewares/authMiddleware')
const router = express.Router()

router.post('/signup', signup)
router.post('/signin', signin)
router.get('/profile', auth, profile)

module.exports = router