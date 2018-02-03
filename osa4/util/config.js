if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}

let port = process.env.PORT
let mongoUri = process.env.MONGODB_URI

if (process.env.NODE_ENV === "test") {
  port = process.env.PORT_TEST,
  mongoUri = process.env.MONGODB_URI_TEST
}

module.exports = {
  port, mongoUri
}
