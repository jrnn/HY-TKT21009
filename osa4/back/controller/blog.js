const blogRouter = require("express").Router()
const Blog = require("../model/blog")

blogRouter.get("/", (req, res) => {
  Blog
    .find({})
    .then(result => res.json(result.map(Blog.format)))
    .catch(error => {
      console.log(error)
      res.status(400).send({ error : "oops! something went kaputt" })
    })
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
