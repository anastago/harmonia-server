const { Schema, model } = require("mongoose")

const noteSchema = new Schema({
  text: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
})

const Note = model("Note", noteSchema)
module.exports = Note
