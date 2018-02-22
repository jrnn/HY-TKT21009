const blogRouter = require("express").Router()
const Blog = require("../model/blog")
const User = require("../model/user")
const jwt = require("jsonwebtoken")

const userFields = { username : 1, name : 1, _id : 0 }

const tokenCheck = (token) => {
  token = jwt
    .verify(token, process.env.SECRET)

  if (token.id && token.username) return token.id
  else return null
}

blogRouter.get("/", async (req, res) => {
  try {
    let blogs = await Blog
      .find({})
      .populate("user", userFields)

    res
      .json(blogs.map(Blog.format))

  } catch (ex) {
    console.log("Error @ GET /api/blogs :", ex.message)

    res
      .status(400)
      .send({ error : ex.message })
  }
})

blogRouter.get("/:id", async (req, res) => {
  try {
    let blog = await Blog
      .findById(req.params.id)
      .populate("user", userFields)

    if (blog) res
      .json(Blog.format(blog))
    else res
      .status(404).end()

  } catch (ex) {
    console.log(`Error @ GET /api/blogs/${req.params.id} :`, ex.message)

    res
      .status(400)
      .send({ error : ex.message })
  }
})

blogRouter.post("/", async (req, res) => {
  try {
    let userId = tokenCheck(req.token)
    if (!userId) throw { message : "missing or invalid token" }

    let errors = Blog.validate(req.body)
    if (errors.message.length > 0) throw errors

    let user = await User.findById(userId)
    let { title, author, url, likes } = req.body
    let blog = new Blog({
      title, author, url, likes,
      user : user._id
    })

    user.blogs = user.blogs
      .concat(blog._id)
    if (blog.likes < 0) blog.likes = 0

    blog = await blog.save()
    await user.save()

    res
      .status(201)
      .json(blog)

  } catch (ex) {
    console.log("Error @ POST /api/blogs :", ex.message)

    if (ex.name === "JsonWebTokenError")
      return res
        .status(401)
        .send({ error : ex.message })

    res
      .status(400)
      .send({ error : ex.message })
  }
})

blogRouter.put("/:id", async (req, res) => {
  try {
    let likes = Math.floor(req.body.likes)

    if (likes < 0)
      throw { message : "likes must be a non-negative integer " }

    let blog = await Blog
      .findByIdAndUpdate(req.params.id, { likes }, { new : true })

    if (!blog) res
      .status(404).end()
    else res
      .json(blog)

  } catch (ex) {
    console.log(`Error @ PUT /api/blogs/${req.params.id} :`, ex.message)

    res
      .status(400)
      .send({ error : ex.message })
  }
})

blogRouter.delete("/:id", async (req, res) => {
  try {
    let userId = tokenCheck(req.token)
    if (!userId) throw { message : "missing or invalid token" }

    let blog = await Blog.findById(req.params.id)
    if (!blog)
      throw { message : "no blog found with that id" }
    if (blog.user && blog.user.toString() !== userId)
      throw { message : "must be logged in as blog owner to delete blog" }

    await blog.remove()

    res
      .status(204).end()

  } catch (ex) {
    console.log("Error @ DELETE /api/blogs :", ex.message)

    res
      .status(401)
      .send({ error : ex.message })
  }
})

module.exports = blogRouter
