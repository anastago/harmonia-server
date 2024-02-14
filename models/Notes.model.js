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
})

const Note = model("Note", noteSchema)
module.exports = Note
