const mongoose = require("mongoose")

const schema = new mongoose.Schema({
  title : String,
  author : String,
  url : String,
  likes : { type : Number, default : 0 },
  user : { type : mongoose.Schema.Types.ObjectId, ref : "User" }
})

schema.statics.format = (blog) => {
  return {
    id : blog._id,
    title : blog.title,
    author : blog.author,
    url : blog.url,
    likes : blog.likes,
    user : blog.user
  }
}

const Blog = mongoose.model("Blog", schema)

module.exports = Blog
