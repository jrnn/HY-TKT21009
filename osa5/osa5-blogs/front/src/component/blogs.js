import React from "react"

import Alert from "./alert"
import Blog from "./blog"
import blogService from "../service/blog_service"
import Form from "./form"
import Togglable from "./togglable"

class Blogs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      alert : null,
      blogs : [],
      title : "",
      author : "",
      url : ""
    }
  }

  componentDidMount() {
    this.refreshBlogs()
  }

  refreshBlogs() {
    blogService
      .findAll()
      .then(blogs => this.setState({ blogs }))
  }

  handleFormChange = (e) => {
    this.setState({ [e.target.name] : e.target.value })
  }

  add = async (e) => {
    e.preventDefault()

    try {
      let blog = await blogService
        .save({
          title : this.state.title,
          author : this.state.author,
          url : this.state.url
        })

      blog = await blogService.findOne(blog._id)
      this.addBlog.toggle()
      this.setState({
        title : "", author : "", url : "",
        blogs : this.state.blogs.concat(blog),
        alert : { type : "success", message : "New blog added" }
      })

    } catch (ex) {
      this.setState({
        alert : { type : "fail", message : "Check your inputs" }
      })
    }

    setTimeout(() => {
      this.setState({ alert : null })
    }, 5000)
  }

  remove = async (e) => {
    e.preventDefault()
    let id = e.target.name

    if (window.confirm("Are you sure fo' shizzle?")) {
      try {
        await blogService.remove(id)
        await this.refreshBlogs()
        this.setState({
          alert : { type : "success", message : "Blog successfully deleted" }
        })

      } catch (ex) {
        this.setState({
          alert : { type : "fail", message : "Dayum! Something went wrong" }
        })
      }
    }

    setTimeout(() => {
      this.setState({ alert : null })
    }, 5000)
  }

  render() {
    let blogsInOrder = () => (
      <div>
        {this.state.blogs
          .sort(function(b1, b2) { return b2.likes - b1.likes })
          .map(blog =>
            <Blog key={blog.id} blog={blog} handleRemove={this.remove} />
          )
        }
      </div>
    )

    return(
      <div>
        {blogsInOrder()}
        <div>
          <Alert alert={this.state.alert} />
          <h2>Add new blog</h2>
          <Togglable button="Add new blog" ref={c => this.addBlog = c}>
            <Form
              handleSubmit={this.add}
              handleField={this.handleFormChange}
              fields={[
                { type : "text", name : "title", value : this.state.title },
                { type : "text", name : "author", value : this.state.author },
                { type : "text", name : "url", value : this.state.url }
              ]}
              submit="Add blog"
            />
          </Togglable>
        </div>
      </div>
    )
  }
}

export default Blogs
