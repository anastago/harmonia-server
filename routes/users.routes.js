const router = require("express").Router()
const jwt = require("jsonwebtoken")
const requireAuth = require("../middleware/requireAuth")
const bcrypt = require("bcrypt")
const User = require("../models/Users.model")

router.post("/", async (req, res, next) => {
  try {
    const { email, password } = req.body
    const salt = bcrypt.genSaltSync()
    const hashedPassword = bcrypt.hashSync(password, salt)
    const createdUser = await User.create({ email, password: hashedPassword })

    const token = jwt.sign(
      { userId: createdUser._id, email: createdUser.email },
      process.env.SECRET_KEY,
      { expiresIn: "10h" }
    )
    res.status(201).json({ message: "User created", token: token })
  } catch (err) {
    console.log(err)
    next(err)
  }
})

router.get("/me", requireAuth, async (req, res, next) => {
  try {
    res.send({ user: req.user })
  } catch (err) {
    next(err)
  }
})

router.get("/", requireAuth, async (req, res, next) => {
  try {
    const users = await User.find().select({ email: 1 })
    res.status(201).json({ message: "All users are found", data: users })
  } catch (err) {
    next(err)
  }
})

router.get("/single", requireAuth, async (req, res, next) => {
  try {
    const id = req.user._id
    const user = await User.findById(id).select({ email: 1 })
    res.status(201).json({
      message: `User with id: ${id} is found`,
      user: user,
    })
  } catch (err) {
    next(err)
  }
})

router.put("/:id", async (req, res, next) => {
  const id = req.params.id
  const { email, password } = req.body
  const updatedUser = { email, password }
  try {
    const user = await User.findByIdAndUpdate(id, updatedUser, {
      new: true,
    })
    res.status(201).json({ message: "User updated", email: updatedUser.email })
  } catch (error) {
    next(error)
  }
})
router.delete("/:id", async (req, res, next) => {
  const id = req.params.id
  try {
    const user = await User.findByIdAndDelete(id)
    res.status(201).json({ message: `user ${user.email} is deleted` })
  } catch (error) {
    next(error)
  }
})

router.post("/signin", async (req, res, next) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (user === null) {
      throw new Error("Authentication failed")
    }

    const comparePassword = bcrypt.compareSync(password, user.password)
    console.log("comparePassword : ", comparePassword)
    if (!comparePassword) {
      throw new Error("Authentication failed")
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.SECRET_KEY,
      { expiresIn: "10h" }
    )

    res.status(201).json({ message: "User signed in", token: token })
  } catch (err) {
    next(err)
  }
})

module.exports = router
