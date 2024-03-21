require("dotenv").config()

require("./config/db")

const express = require("express")
const morgan = require("morgan")
const cors = require("cors")

const { model } = require("mongoose")

require("./models/Notes.model")

const app = express()

app.use(morgan("dev"))
app.use(cors({ origin: "*" }))

app.use(express.json())
app.use(express.urlencoded({ extends: true }))

app.use("/api", require("./routes/index.routes"))

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

app.listen(process.env.PORT, () => {
  console.log(`Running on : http://localhost:${process.env.PORT}`)
})
