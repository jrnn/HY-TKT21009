const blogRouter = require("express").Router()
const Blog = require("../model/blog")

blogRouter.get("/", async (req, res) => {
  try {
    let blogs = await Blog.find({})
    res.json(blogs.map(Blog.format))
  } catch (ex) {
    console.log(ex)
    res.status(400).send({ error : "oops! something went kaputt" })
  }
})

blogRouter.post("/", (req, res) => {
  let blog = new Blog(req.body)

  blog
    .save()
    .then(result => res.status(201).json(result))
    .catch(error => {
      console.log(error)
      res.status(400).send({ error : "oops! something went kaputt" })
    })
})

module.exports = blogRouter
