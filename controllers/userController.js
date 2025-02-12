const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const registerUser = asyncHandler(async(req, res) => {
  const {name, email, password} = req.body
  // Validatiion
  if(!name || !email || !password){
    res.status(400)
    throw new Error('Please type in all feilds')
  }
  // Check if user exist
  const userExists = await User.findOne({email})
  if(userExists){
    res.status(404)
    throw new Error('User already exists')
  }else{
      // else, hashpassword
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    //then create user
    const user = await User.create({
      name,
      email,
      password:hashedPassword
    })
    if(user){
      res.status(201).json({
        _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
      })
    }else{
      res.status(404)
      throw new Error('Chech your internet connection')
    }
  }
})

const loginUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body
   // Validatiing the Login Details
   const user = await User.findOne({email})
   if(user && (await bcrypt.compare(password, user.password))){
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
   }else{
    res.status(401)
    throw new Error('Invalid Credentials')
   } 
})

const getMe = asyncHandler(async(req, res) => {
  const user = {
    id : req.user._id,
    name: req.user.name,
    email: req.user.email
  }
  res.status(201).json(user)
})

// Generate JWT
const generateToken = (id)=>{
  return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn:'30d'
  })
}

module.exports = {
  registerUser,
  loginUser,
  getMe
}