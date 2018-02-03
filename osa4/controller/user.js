const userRouter = require("express").Router()
const User = require("../model/user")
const bcrypt = require("bcrypt")
const bcryptCost = 10

const usernameExists = async (username) => {
  let users = await User.find({ username : username })
  return (users.length > 0)
}

userRouter.get("/", async (req, res) => {
  try {
    let users = await User
      .find({})
      .populate("blogs", { title : 1, author : 1, url : 1, likes : 1 })

    res.json(users.map(User.format))
  } catch (ex) {
    console.log(ex)
    res.status(400).send({ error : "oops! something went kaputt" })
  }
})

userRouter.post("/", async (req, res) => {
  try {
    if (!req.body.username || req.body.username.length < 3)
      throw "username must be at least 3 characters"
    if (!req.body.password || req.body.password.length < 3)
      throw "password must be at least 3 characters"
    if (!req.body.name || req.body.name.length < 3)
      throw "name must be at least 3 characters"

    if (await usernameExists(req.body.username))
      throw "username must be unique"

    let passwordHash = await bcrypt
      .hash(req.body.password, bcryptCost)

    let user = new User({
      username : req.body.username,
      passwordHash,
      name : req.body.name,
      adult : req.body.adult
    })

    user = await user.save()
    res.status(201).json(User.format(user))
  } catch (ex) {
    console.log(ex)
    res.status(400).json({ error : ex })
  }
})

module.exports = userRouter
