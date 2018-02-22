const express = require("express")
const app = express()
const server = require("http").createServer(app)
const config = require("./util/config")

const mongoose = require("mongoose")
mongoose
  .connect(config.dbUri)
  .then(() => {
    console.log("Connected to DB @",config.dbUri)
  })
  .catch(ex => {
    console.log(ex)
  })
mongoose.Promise = global.Promise

const cors = require("cors")
const bodyParser = require("body-parser")
const middleware = require("./util/middleware")
app.use(cors())
app.use(bodyParser.json())
app.use(middleware.tokenParser)
app.use(middleware.logger)

const blogRouter = require("./controller/blog_router")
const loginRouter = require("./controller/login_router")
const userRouter = require("./controller/user_router")
app.use("/api/blogs", blogRouter)
app.use("/api/login", loginRouter)
app.use("/api/users", userRouter)

// app.use(express.static("build")) <-- TARVITTANEEN JOSSAIN VAIHEESSA

server.listen(config.port, () => {
  console.log(`Now listening on port ${config.port}`)
})

server.on("close", () => {
  console.log("Now closing server and connection to db")
  mongoose.connection.close()
})

module.exports = { app, server }
