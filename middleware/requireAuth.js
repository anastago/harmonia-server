const jwt = require("jsonwebtoken")
const User = require("../models/Users.model")
const { Long, AutoEncryptionLoggerLevel } = require("mongodb")

const requireAuth = (req, res, next) => {
  const { authorization } = req.headers
  if (!authorization) {
    return res.status(401).send({ error: "You must be logged in." })
  }

  const token = authorization.replace("Bearer ", "")

  jwt.verify(token, process.env.SECRET_KEY, async (err, payload) => {
    if (err) {
      console.log(err)
      res.status(401).json({ error: "You must be logged in." })
    }
    if (!payload || !payload.userId) {
      return res.status(401).json({ error: "Invalid token." })
    }

    console.log(payload)
    const { userId } = payload
    try {
      const user = await User.findById(userId)
      if (!user) {
        return res.status(401).json({ error: "User not found." })
      }
      req.user = user
      next()
    } catch (error) {
      console.error("Error finding user:", error)
      return res.status(500).json({ error: "Internal server error." })
    }
  })
}

module.exports = requireAuth
