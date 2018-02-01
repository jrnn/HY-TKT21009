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
    let newBlog = new Blog(req.body)

    if (!newBlog.title) throw "title missing"
    if (!newBlog.author) throw "author missing"
    if (!newBlog.url) throw "url missing"

    newBlog = await newBlog.save()
    res.status(201).json(Blog.format(newBlog))
  } catch (ex) {
    console.log(ex)
    res.status(400).send({ error : ex })
  }
})

module.exports = blogRouter
