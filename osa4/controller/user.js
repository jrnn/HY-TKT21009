const userRouter = require("express").Router()
const User = require("../model/user")
const bcrypt = require("bcrypt")
const bcryptCost = 10

userRouter.get("/", async (req, res) => {
  try {
    let users = await User.find({})
    res.json(users.map(User.format))
  } catch (ex) {
    console.log(ex)
    res.status(400).send({ error : "oops! something went kaputt" })
  }
})

userRouter.post("/", async (req, res) => {
  try {
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
    response.status(500).json({ error : "oops! something went kaputt" })
  }
})

module.exports = userRouter
