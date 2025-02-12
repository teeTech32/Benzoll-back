const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')
const Note = require('../models/noteModel')

const getNotes = asyncHandler(async(req, res)=>{
  const user = await User.findById(req.user.id)
  if(!user){
    res.status(401)
    throw new Error('User not found')
  }
  const ticket = await Ticket.findById(req.params.ticketId)
  if(ticket.user.toString() !== req.user.id){
    res.status(401)
    throw new Error('User not authorized')
  }
  const notes = await Note.find({ticket: req.params.ticketId})
  res.status(200).json(notes)
})

const addNote = asyncHandler(async(req, res)=>{
  const user = await User.findById(req.user.id)
  if(!user){
    res.status(401)
    throw new Error('User not authorize')
  }
  const ticket = await Ticket.findById(req.params.ticketId)
  if(ticket.user.toString() !== req.user.id){
    res.status(401)
    throw new Error ('Unauthorize user ')
  }
  const note = await Note.create({
    text: req.body.text,
    isstaff: req.body.isstaff,
    ticket: req.params.ticketId,
    user: req.user.id
  })
  res.status(201).json(note)
})

const editNote = asyncHandler( async(req, res)=>{
  const user = await User.findById(req.user.id)
  if(!user){
    res.status(404)
    throw new Error('Unauthorized user')
  }
  const ticket = await Ticket.findById(req.params.ticketId)
  if(ticket.user.toString() !== req.user.id){
    res.status(404)
    throw new Error('Unauthorized ticketId user')
  }
  const note = await Note.findByIdAndUpdate(req.params.noteId, req.body, {new: true})
  res.status(200).json(note)
})

 const deleteNote = asyncHandler(async(req, res)=>{
  const user = await User.findById(req.user.id)
  if(!user){
    res.status(404)
    throw new Error("Unauthorized user")
  }
  const ticket = await Ticket.findById(req.params.ticketId)
  if(ticket.user.toString() !== req.user.id){
    res.status(404)
    throw new Error('Unauthorized user')
  }
  const note = await Note.findById(req.params.noteId)
  await note.deleteOne()
  res.status(200).json({success: true})
 })

module.exports = {
  getNotes,
  addNote,
  editNote,
  deleteNote
}