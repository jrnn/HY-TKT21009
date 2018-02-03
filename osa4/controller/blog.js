const blogRouter = require("express").Router()
const Blog = require("../model/blog")
const User = require("../model/user")

getRandomUser = async () => {
  let users = await User.find({})
  let i = Math.floor(Math.random() * users.length)
  return users[i]
}

blogRouter.get("/", async (req, res) => {
  try {
    let blogs = await Blog
      .find({})
      .populate("user", { username : 1, name : 1, adult : 1 })

    res.json(blogs.map(Blog.format))
  } catch (ex) {
    console.log(ex)
    res.status(400).send({ error : "oops! something went kaputt" })
  }
})

blogRouter.get("/:id", async (req, res) => {
  try {
    let blog = await Blog
      .findById(req.params.id)
      .populate("user", { username : 1, name : 1, adult : 1 })

    if (blog) res.json(Blog.format(blog))
    else res.status(404).end()
  } catch (ex) {
    console.log(ex)
    res.status(400).send({ error : "invalid id" })
  }
})

blogRouter.post("/", async (req, res) => {
  try {
    if (!req.body.title) throw "title missing"
    if (!req.body.author) throw "author missing"
    if (!req.body.url) throw "url missing"
    /*if (!req.body.userId) throw "userId missing"

    let user = await User.findById(req.body.userId)
    if (!user) throw "invalid userId"*/

    // temporary measure : assign user randomly
    let user = await getRandomUser()

    let newBlog = new Blog(req.body)
    newBlog.user = user._id
    newBlog = await newBlog.save()

    user.blogs = user.blogs.concat(newBlog._id)
    await user.save()

    res.status(201).json(Blog.format(newBlog))
  } catch (ex) {
    console.log(ex)
    res.status(400).send({ error : ex })
  }
})

blogRouter.put("/:id", async (req, res) => {
  try {
    if (isNaN(req.body.likes) || req.body.likes < 0)
      throw "invalid value for 'likes'"

    let blog = await Blog.findById(req.params.id)
    blog.likes = req.body.likes

    blog = await Blog.findByIdAndUpdate(req.params.id, blog, { new : true })
    res.json(Blog.format(blog))
  } catch (ex) {
    console.log(ex)
    res.status(400).send({ error : ex })
  }
})

blogRouter.delete("/:id", async (req, res) => {
  try {
    let blog = await Blog.findById(req.params.id)
    if (!blog) throw "invalid id"

    let user = await User.findById(blog.user)
    if (!user) throw "related user not found"

    await blog.remove()

    let blogs = await Blog.find({ user : user._id })
    user.blogs = blogs.map(b => b._id)
    await user.save()

    res.status(204).end()
  } catch (ex) {
    console.log(ex)
    res.status(400).send({ error : ex })
  }
})

module.exports = blogRouter
