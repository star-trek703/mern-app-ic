const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// @desc  Create an account
// @route /auth/signup
// @access  Public
const signup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    res.status(400)
    throw new Error('All fields required')
  }

  const emailExist = await User.findOne({ email })

  if (emailExist) {
    res.status(400)
    throw new Error('Email ID already exist')
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const user = await User.create({
    name,
    email,
    password: hashedPassword
  })

  const token = generateToken(user._id)
  
  res.status(201).json({
    id: user._id,
    name: user.name,
    email: user.email,
    token
  })
})

// @desc  Login to your account
// @route /auth/signup
// @access  Public
const signin = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400)
    throw new Error('All fields required')
  }

  const user = await User.findOne({ email })

  if (!user) {
    res.status(400)
    throw new Error('Invalid email ID')
  }

  if (! await bcrypt.compare(password, user.password)) {
    res.status(400)
    throw new Error('Incorrect password')
  }

  const token = generateToken(user._id)

  res.status(200).json({
    id: user._id,
    name: user.name,
    email: user.email,
    token
  })
})

// @desc  Profile of an authenticated user
// @route /auth/profile
// @access  Private
const profile = asyncHandler(async (req, res) => {
  res.status(200).json({
    id: req.user._id,
    name: req.user.name,
    email: req.user.email
  })
})

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  })
}

module.exports = {
  signup,
  signin,
  profile
}