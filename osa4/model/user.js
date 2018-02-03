const mongoose = require("mongoose")

const schema = new mongoose.Schema({
  username : String,
  passwordHash : String,
  name : String,
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

const User = mongoose.model("User", schema)

module.exports = User
