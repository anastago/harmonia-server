const router = require("express").Router()
const Note = require("../models/Notes.model")
const requireAuth = require("../config/middleware/requireAuth")
const {
  createAIResponseForNoteId,
  deleteAIResponseForNoteId,
} = require("../analyzeService")

router.post("/", requireAuth, async (req, res, next) => {
  try {
    const { text } = req.body
    const createdNote = await Note.create({ text, user: req.user._id })

    await createAIResponseForNoteId(createdNote._id, createdNote.text)

    res.status(201).json({ message: "Note created", data: createdNote })
  } catch (err) {
    next(err)
  }
})

router.get("/", requireAuth, async (req, res, next) => {
  try {
    const notes = await Note.find({ user: req.user._id })
      .select({ text: 1 })
      .populate("user", { _id: 0, email: 1 })
    res.status(200).json({ message: "All notes successfully found", notes })
  } catch (error) {
    next(error)
  }
})

router.get("/:noteId", async (req, res, next) => {
  const noteId = req.params.noteId
  try {
    const note = await Note.findById(noteId)
      .select({ text: 1 })
      .populate("user", { _id: 0, email: 1 })
    res.status(200).json({ message: "Note found by ID", data: note })
  } catch (error) {
    next(error)
  }
})

router.put("/:noteId", async (req, res, next) => {
  // const noteId = req.params.noteId
  const { noteId } = req.params
  const { text } = req.body
  try {
    const updatedNote = await Note.findByIdAndUpdate(
      noteId,
      { text },
      { new: true }
    ).populate("user", { _id: 0, email: 1 })

    await deleteAIResponseForNoteId(noteId)

    await createAIResponseForNoteId(noteId, updatedNote.text)

    res
      .status(200)
      .json({ message: "Note successfully updated", data: updatedNote })
  } catch (error) {
    next(error)
  }
})

router.delete("/:noteId", async (req, res, next) => {
  const noteId = req.params.noteId
  try {
    const deletedNote = await Note.findByIdAndDelete(noteId)
    await deleteAIResponseForNoteId(noteId)
    res.status(200).json({ message: "Note is deleted", data: deletedNote })
  } catch (err) {
    next(err)
  }
})

module.exports = router
