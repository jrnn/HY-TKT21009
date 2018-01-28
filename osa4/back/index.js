const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const mongoose = require ("mongoose")
require("dotenv").config()

const Blog = mongoose.model("Blog", {
  title : String,
  author : String,
  url : String,
  likes : Number
})

module.exports = Blog

app.use(cors())
app.use(bodyParser.json())

const mongoUrl = process.env.MONGODB_URI
console.log(process.env.MONGODB_URI)
mongoose.connect(mongoUrl)
mongoose.Promise = global.Promise

app.get("/api/blogs", (req, res) => {
  Blog
    .find({})
    .then(result => {
      res.json(result)
    })
})

app.post("/api/blogs", (req, res) => {
  let blog = new Blog(req.body)

  blog
    .save()
    .then(result => {
      res.status(201).json(result)
    })
})

const PORT = 3003
app.listen(PORT, () => console.log(`Now listening on port ${PORT}`))
