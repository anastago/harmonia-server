const router = require("express").Router()

// aut

const Note = require("../models/Notes.model")

router.post("/", async (req, res, next) => {
  try {
    const userId = req.user._id
    const text = req.body
    const createdNote = await Note.create({ text, user: userId })
    res.status(201).json({ message: "Note created", data: createdNote })
  } catch (err) {
    next(err)
  }
})
