require("dotenv").config()

require("./config/db")

const express = require("express")
const morgan = require("morgan")
const cors = require("cors")

const { model } = require("mongoose")

const app = express()

app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extends: true }))
