const express = require('express')
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')
const {getTickets, getTicket, createTicket, deleteTicket,
      updateTicket, getAll} = require('../controllers/ticketController') 

router.route('/').get(protect, getTickets).post(protect, createTicket)
router.route('/alltickets').get(getAll)
router.route('/:id').get(protect, getTicket).delete(protect, deleteTicket).put(protect, updateTicket)

// Re-route into note router
const noteRouter = require('./noteRoutes')
router.use('/:ticketId/notes', noteRouter)
router.use('/:ticketId/notes/:noteId', noteRouter)

module.exports = router