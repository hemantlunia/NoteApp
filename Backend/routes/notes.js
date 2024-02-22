const express = require('express');
const router = express.Router()
var fetchuser = require('../middleware/fetchuser')
const Note = require('../models/Note')
const { body, validationResult } = require('express-validator')


//ROUTE:1 get all the notes using : GET "/api/notes/fetchallnotes" . login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
     try {
          const notes = await Note.find({ user: req.user.id })
          res.json(notes)
     } catch (error) {
          console.error(error.message);
          res.status(500).send("Internal server error")
     }
})



//ROUTE:2 add notes using POST : GET "/api/notes/addnote" . login required
router.post('/addnote', fetchuser, [
     body('title', 'Enter a valid title').isLength({ min: 3 }),
     body('description', 'Description must be atleast 5 character').isLength({ min: 2 })
], async (req, res) => {
     try {
          const { title, description, tag } = req.body;
          // if there are error return bad request and the error
          const errors = validationResult(req);
          if (!errors.isEmpty) {
               return res.status(400).json({ errors: errors.array() })
          }
          const note = new Note({
               title, description, tag, user: req.user.id
          })
          const saveNote = await note.save()
          res.json(saveNote)
     } catch (error) {
          console.error(error.message)
          res.status(500).send("Internal server Error")
     }

})

// ROUTE : 3  update existing note using : PUT "/api/notes/updatenote" login required

router.put('/updatenote/:id', fetchuser, async (req, res) => {
     const { title, description, tag } = req.body;
     try {
          const newNote = {};
          if (title) { newNote.title = title }
          if (description) { newNote.description = description }
          if (tag) { newNote.tag = tag }

          //    find the note to be updated and update it
          let note = await Note.findById(req.params.id)
          if (!note) { return res.status(404).send("Not Found") }
          if (note.user.toString() !== req.user.id) {
               return res.status(401).send("Not allowed")
          }
          note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
          res.json({ note })
     } catch (error) {
          console.error(error.message)
          res.status(500).send("Internal server Error")
     }

})


// ROUTE : 4  delete existing note using : DELETE "/api/notes/deletenote" login required

router.delete('/deletenote/:id', fetchuser, async (req, res) => {
     // const { title, description, tag } = req.body;
     try {
          //    find the note to be deleted and delete it
          let note = await Note.findById(req.params.id)
          if (!note) { return res.status(404).send("Not Found") }

          //   allow deletion only if user own this note
          if (note.user.toString() !== req.user.id) {
               return res.status(401).send("Not allowed")
          }
          note = await Note.findByIdAndDelete(req.params.id)
          res.json({ "success": "note has been deleted", note: note })
     } catch (error) {
          console.error(error.message)
          res.status(500).send("Internal server Error")
     }

})


module.exports = router

