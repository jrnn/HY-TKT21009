import React from "react"

const Blog = ({ blog }) => (
  <li>
    {blog.title} || {blog.author}
  </li>
)

export default Blog
