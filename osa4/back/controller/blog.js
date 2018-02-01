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

blogRouter.get("/:id", async (req, res) => {
  try {
    let blog = await Blog.findById(req.params.id)

    if (blog) res.json(Blog.format(blog))
    else res.status(404).end()
  } catch (ex) {
    console.log(ex)
    res.status(400).send({ error : "invalid id" })
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

blogRouter.delete("/:id", async (req, res) => {
  try {
    await Blog.findByIdAndRemove(req.params.id)
    res.status(204).end()
  } catch (ex) {
    console.log(ex)
    res.status(400).send({ error : "invalid id" })
  }
})

module.exports = blogRouter
