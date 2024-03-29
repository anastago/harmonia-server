const router = require("express").Router()
const Note = require("../models/Notes.model")
const requireAuth = require("../middleware/requireAuth")

// create a note
router.post("/", requireAuth, async (req, res, next) => {
  try {
    const { text } = req.body
    const createdNote = await Note.create({ text, user: req.user._id })

    res.status(201).json({ message: "Note created", data: createdNote })
  } catch (err) {
    next(err)
  }
})

// get all user's notes and sort, newest to oldest
router.get("/owner", requireAuth, async (req, res, next) => {
  const userId = req.user._id
  try {
    const notes = await Note.find({ user: userId, text: { $ne: "" } })
      .select({ text: 1, createdAt: 1 })
      .populate("user")
      .sort({ createdAt: -1 })

    res.status(200).json({ message: "Notes found by userId", notes: notes })
  } catch (error) {
    next(error)
  }
})

// get one note by ID
router.get("/:noteId", requireAuth, async (req, res, next) => {
  const noteId = req.params.noteId
  try {
    const note = await Note.findById(noteId)
      .select({ text: 1, createdAt: 1 })
      .populate("user", { _id: 0, email: 1 })
    res.status(200).json({ message: "Note found by ID", data: note })
  } catch (error) {
    next(error)
  }
})
// update note
router.put("/:noteId", requireAuth, async (req, res, next) => {
  const { noteId } = req.params
  const { text } = req.body
  try {
    const updatedNote = await Note.findByIdAndUpdate(
      noteId,
      { text },
      { new: true },
      { createdAt: Date.now() }
    ).populate("user", { _id: 0, email: 1 })

    res.status(200).json({
      message: "Note successfully updated",
      data: updatedNote,
    })
  } catch (error) {
    next(error)
  }
})
// delete note
router.delete("/:noteId", requireAuth, async (req, res, next) => {
  const noteId = req.params.noteId
  try {
    const deletedNote = await Note.findByIdAndDelete(noteId)
    res.status(200).json({ message: "Note deleted", data: deletedNote })
  } catch (err) {
    next(err)
  }
})

module.exports = router
