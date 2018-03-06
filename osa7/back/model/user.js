const mongoose = require("mongoose")

const schema = new mongoose.Schema({
  username : String,
  name : String,
  pwHash : String,
  adult : { type : Boolean, default : true },
  blogs : [{ type : mongoose.Schema.Types.ObjectId, ref : "Blog" }]
})

schema.statics.format = (user) => {
  return {
    id : user._id,
    username : user.username,
    name : user.name,
    adult : user.adult,
    blogs : user.blogs
  }
}

schema.statics.validate = (user) => {
  let errors = { message : [] }

  if (!user.username || user.username.length < 3)
    errors.message.push("username must be at least 3 characters")
  if (!user.name || user.name.length < 3)
    errors.message.push("name must be at least 3 characters")
  if (!user.password || user.password.length < 3)
    errors.message.push("password must be at least 3 characters")

  return errors
}

const User = mongoose.model("User", schema)

module.exports = User
