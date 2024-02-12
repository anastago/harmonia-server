const { Schema, model } = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Please enter your email address"],
    unique: true,
    validate: {
      validator: function (value) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
      },
      message: "Invalid email address format",
    },
  },
  password: {
    type: String,
    required: true,
  },
})

const User = model("User", userSchema)
module.exports = User
