const mongoose = require("mongoose")

const schema = new mongoose.Schema({
  title : String,
  author : String,
  url : String,
  likes : { type : Number, default : 0 }
})

schema.statics.format = function(blog) {
  return {
    id : blog._id,
    title : blog.title,
    author : blog.author,
    url : blog.url,
    likes : blog.likes
  }
}

const Blog = mongoose.model("Blog", schema)

module.exports = Blog
