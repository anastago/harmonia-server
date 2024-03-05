const { Schema, model } = require("mongoose")

const aiResponseSchema = new Schema({
  text: {
    type: String,
  },
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const AIResponse = model("AIResponse", aiResponseSchema)
module.exports = AIResponse
