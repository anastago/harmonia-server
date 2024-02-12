const { Schema, model } = require("mongoose")

const noteSchema = new Schema({
  text: {
    type: String,
  },
  createdAt: {
    type: Date,
    immutable: true,
  },
  updatedAt: {
    type: Date,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  aiResponse: {
    type: Schema.Types.ObjectId,
    ref: "AIResponse",
  },
})

const Note = model("Note", noteSchema)
module.exports = Note
