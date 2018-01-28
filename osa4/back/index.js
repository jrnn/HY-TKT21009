const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const mongoose = require ("mongoose")
require("dotenv").config()

const blogRouter = require("./controller/blog")
const Blog = require("./model/blog")

app.use(cors())
app.use(bodyParser.json())
// app.use(express.static("build")) <-- perhaps needed at some point
app.use("/api/blogs", blogRouter)

mongoose.connect(process.env.MONGODB_URI)
mongoose.Promise = global.Promise

const PORT = 3003
app.listen(PORT, () => console.log(`Now listening on port ${PORT}`))
