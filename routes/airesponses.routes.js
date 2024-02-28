const router = require("express").Router()
const AIResponse = require("../models/AIResponses.model")
const Note = require("../models/Notes.model")

const requireAuth = require("../middleware/requireAuth")

const { analyzeResponseAI } = require("../analyzeService.js")

router.post("/", requireAuth, async (req, res, next) => {
  try {
    const { noteId } = req.body

    try {
      const note = await Note.findById(noteId).select({ text: 1 })
      if (!note) {
        return res.status(404).json({ message: "Note not found" })
      }

      const aiResponseText = await analyzeResponseAI(note.text)
      const aiResponse = await AIResponse.create({
        note: noteId,
        text: aiResponseText,
      })

      res.status(201).json({ message: "AI Response created", data: aiResponse })
    } catch (error) {
      console.error("Error creating AI response:", error)
      res.status(500).json({ message: "Internal server error" })
    }
  } catch (err) {
    next(err)
  }
})

router.put("/", requireAuth, async (req, res, next) => {
  try {
    const { noteId } = req.body

    try {
      const note = await Note.findById(noteId).select({ text: 1 })
      if (!note) {
        return res.status(404).json({ message: "Note not found" })
      }

      const aiResponseText = await analyzeResponseAI(note.text)
      const aiResponse = await AIResponse.findOneAndUpdate(
        { note: noteId },
        { text: aiResponseText },
        { new: true }
      )

      if (!aiResponse) {
        return res.status(404).json({ message: "AI Response not found" })
      }

      res.status(201).json({ message: "AI Response updated", data: aiResponse })
    } catch (error) {
      console.error("Error updating AI response:", error)
      res.status(500).json({ message: "Internal server error" })
    }
  } catch (err) {
    next(err)
  }
})

router.get("/single", requireAuth, async (req, res, next) => {
  try {
    const { noteId } = req.query
    const aiResponse = await AIResponse.find({ note: noteId }).select({
      text: 1,
    })

    res
      .status(200)
      .json({ message: "AI response successfully found", aiResponse })
  } catch (error) {
    next(error)
  }
})

module.exports = router
