const mongoose = require("mongoose")

const schema = new mongoose.Schema({
  username : String,
  passwordHash : String,
  name : String,
  adult : Boolean
})

schema.statics.format = (user) => {
  return {
    id : user._id,
    username : user.username,
    name : user.name,
    adult : user.adult
  }
}

const User = mongoose.model("User", schema)

module.exports = User
