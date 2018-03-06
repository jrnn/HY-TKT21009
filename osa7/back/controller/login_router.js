const loginRouter = require("express").Router()
const User = require("../model/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

loginRouter.post("/", async (req, res) => {
  let user = await User
    .findOne({ username : req.body.username })

  let pwCheck = !user
    ? false
    : await bcrypt
      .compare(req.body.password, user.pwHash)

  if ( !(user && pwCheck) )
    return res
      .status(401)
      .send({ error : "invalid username or password" })

  let { _id, username, name } = user
  let token = jwt
    .sign({ id : _id, username }, process.env.SECRET)

  res
    .status(200)
    .send({ token, username, name })
})

module.exports = loginRouter
