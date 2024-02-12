const { Schema, model } = require("mongoose")

const aiResponseSchema = new Schema({
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
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note",
  },
})

const AIResponse = model("AIResponse", aiResponseSchema)
module.exports = AIResponse
