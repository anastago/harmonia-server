const router = require("express").Router()

router.use("/users", require("./users.routes"))
router.use("/notes", require("./notes.routes"))
router.use("/airesponses", require("./airesponses.routes"))

module.exports = router
