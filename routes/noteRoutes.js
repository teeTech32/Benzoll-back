const express = require('express')
const router = express.Router({mergeParams:true})
const {getNotes, deleteNote, addNote, editNote} = require('../controllers/noteController')
const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect, getNotes).post(protect, addNote)
router.route('/:noteId').put(protect, editNote).delete(protect, deleteNote)


module.exports = router