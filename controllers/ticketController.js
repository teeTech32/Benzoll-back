const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')

// Get All Tickets
const getAll = asyncHandler(async(req, res)=>{
  const alltickets = await Ticket.find()
  res.status(200).json(alltickets)
})

// Get Tickets
const getTickets = asyncHandler(async(req, res)=>{
  // Get user by the token id '/api/get'
  const user = await User.findById(req.user.id)
  if(!user){
    res.status(401)
    throw new Error('User not fund')
  }
  const tickets = await Ticket.find({user: req.user.id})
  res.status(200).json(tickets)
})

// Get Single Ticket
const getTicket = asyncHandler(async(req, res)=>{
  // Get ticket by the ticket params id: '/api/get/:id'
  const user = await User.findById(req.user.id)
  if(!user){
    res.status(401)
    throw new Error('User not fund')
  }
  const ticket = await Ticket.findById(req.params.id)
  if(!ticket){
    res.status(401)
    throw new Error('Ticket not fund')
  }
  if(ticket.user.toString() !== req.user.id){
    res.status(401)
    throw new Error('Request Unauthorized')
  }
  res.status(200).json(ticket)
})

// Create Ticket "/api/post"
const createTicket = asyncHandler(async(req, res)=>{
  // Check if product and description are indicated
  const {product, description} = req.body
  
  if(!product || !description){
    res.status(400)
    throw new Error('Please sellect product and make a description')
  }
  // Get user by id from token
  const user = await User.findById(req.user)
  if(!user){
    res.status(401)
    throw new Error('User not fund')
  }
  const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
    status: 'new'
  })
  res.status(201).json(ticket)
})
// Delete Ticket
const deleteTicket = asyncHandler(async(req, res)=>{
   const user = await User.findById(req.user.id)
  if(!user){
    res.status(401)
    throw new Error('User not fund')
  }
  const ticket = await Ticket.findById(req.params.id)
  if(!ticket){
    res.status(401)
    throw new Error('Ticket not fund')
  }
  if(ticket.user.toString() !== req.user.id){
    res.status(401)
    throw new Error('Request Unauthorized')
  }
  await ticket.deleteOne()
  res.status(200).json({success: true})
})
// Update Ticket
const updateTicket = asyncHandler(async(req, res) =>{
  // Get user by the params id: '/api/get/:id'
  const user = await User.findById(req.user.id)
  if(!user){
    res.status(401)
    throw new Error('User not fund')
  }
  const ticket = await Ticket.findById(req.params.id)
  if(!ticket){
    res.status(401)
    throw new Error('Ticket not fund')
  }
  if(ticket.user.toString() !== req.user.id){
    res.status(401)
    throw new Error('Request Unauthorized')
  }
  const updateTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true})
  res.status(200).json(updateTicket)
})

module.exports = {
  getTickets,
  getTicket,
  createTicket,
  deleteTicket,
  updateTicket,
  getAll
}