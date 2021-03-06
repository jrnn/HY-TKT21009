const express = require("express")
const app = express()

const bodyParser = require("body-parser")
const cors = require("cors")
const http = require("http")
const mongoose = require ("mongoose")
const middleware = require("./util/middleware")
const config = require("./util/config")
const blogRouter = require("./controller/blog")
const loginRouter = require("./controller/login")
const userRouter = require("./controller/user")
const server = http.createServer(app)

mongoose.connect(config.mongoUri)
mongoose.Promise = global.Promise

app.use(cors())
app.use(bodyParser.json())
app.use(middleware.tokenGitter)
// app.use(express.static("build")) <-- perhaps needed at some point

app.use("/api/blogs", blogRouter)
app.use("/api/login", loginRouter)
app.use("/api/users", userRouter)

server.listen(config.port, () => {
  console.log(`Now listening on port ${config.port}`)
})

server.on("close", () => {
  console.log(`Now closing server and connection to db`)
  mongoose.connection.close()
})

module.exports = {
  app, server
}
