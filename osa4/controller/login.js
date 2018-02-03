const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const loginRouter = require("express").Router()
const User = require("../model/user")

loginRouter.post("/", async (req, res) => {
  let user = await User
    .findOne({ username : req.body.username })

  let pwCheck = !user
    ? false
    : await bcrypt
      .compare(req.body.password, user.passwordHash)

  if (!(user && pwCheck))
    return res
      .status(401)
      .send({ error : "invalid username or password" })

  let token = jwt
    .sign({
      id : user._id,
      username : user.username
    }, process.env.SALAISUUS)

  res
    .status(200)
    .send({
      token,
      username : user.username,
      name : user.name
    })
})

module.exports = loginRouter
