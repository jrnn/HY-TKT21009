const userRouter = require("express").Router()
const User = require("../model/user")
const bcrypt = require("bcrypt")
const bcryptCost = 10

const blogFields = { _id : 0, __v : 0, user : 0 }

const usernameExists = async (username) => {
  let users = await User
    .find({ username })

  return (users.length > 0)
}

userRouter.get("/", async (req, res) => {
  try {
    let users = await User
      .find({})
      .populate("blogs", blogFields)

    res
      .json(users.map(User.format))

  } catch (ex) {
    console.log("Error @ GET /api/users :", ex.message)

    res
      .status(400)
      .send({ error : ex.message })
  }
})

userRouter.get("/:id", async (req, res) => {
  try {
    let user = await User
      .findById(req.params.id)
      .populate("blogs", blogFields)

    if (user) res
      .json(User.format(user))
    else res
      .status(404).end()

  } catch (ex) {
    console.log(`Error @ GET /api/users/${req.params.id} :`, ex.message)

    res
      .status(400)
      .send({ error : ex.message })
  }
})

userRouter.post("/", async (req, res) => {
  try {
    let errors = User.validate(req.body)
    if (errors.message.length > 0) throw errors

    if (await usernameExists(req.body.username))
      throw { message : "username must be unique" }

    let { username, name, adult } = req.body
    let pwHash = await bcrypt
      .hash(req.body.password, bcryptCost)

    let user = new User({ username, name, pwHash, adult })
    user = await user.save()

    res
      .status(201)
      .json(User.format(user))

  } catch (ex) {
    console.log("Error @ POST /api/users :", ex.message)

    res
      .status(400)
      .send({ error : ex.message })
  }
})

module.exports = userRouter
