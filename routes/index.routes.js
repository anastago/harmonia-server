const router = require("express").Router()

router.use("/users", require("./users.routes"))
router.use("/notes", require("./notes.routes"))
// ai resp no route ?

module.exports = router
