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

blogRouter.post("/", async (req, res) => {
  try {
    let newBlog = await new Blog(req.body).save()
    res.status(201).json(Blog.format(newBlog))
  } catch (ex) {
    console.log(error)
    res.status(400).send({ error : "oops! something went kaputt" })
  }
})

module.exports = blogRouter
