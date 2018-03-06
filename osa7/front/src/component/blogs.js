import React from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import Blog from "./blog"
import Form from "./form"
import Togglable from "./togglable"

import { setNotification } from "../reducer/notification_reducer"

import blogService from "../service/blog_service"

class Blogs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs : [],
      title : "",
      author : "",
      url : "",
      user : props.user || null
    }
  }
  static propTypes = {
    user : PropTypes.object.isRequired,
    handleLogout : PropTypes.func.isRequired
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
        blogs : this.state.blogs.concat(blog)
      })
      this.props.setNotification("New blog added", "success", 5)

    } catch (ex) {
      this.props.setNotification("Check your inputs", "fail", 5)
    }
  }

  remove = async (e) => {
    e.preventDefault()
    let id = e.target.name

    if (window.confirm("Are you sure fo' shizzle?")) {
      try {
        await blogService.remove(id)
        await this.refreshBlogs()
        this.props.setNotification("Blog successfully deleted", "success", 5)

      } catch (ex) {
        this.props.setNotification("Dayum! Something went wrong", "fail", 5)
      }
    }
  }

  render() {
    let blogsInOrder = () => (
      <div>
        {this.state.blogs
          .sort(function(b1, b2) { return b2.likes - b1.likes })
          .map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              user={this.state.user}
              handleRemove={this.remove}
            />
          )
        }
      </div>
    )

    return(
      <div>
        <div>
          <h2>Blogs</h2>
          <p>
            Logged in as {this.state.user.name}&nbsp;
            <button onClick={this.props.handleLogout}>Logout</button>
          </p>
        </div>
        <div>
          {blogsInOrder()}
        </div>
        <div>
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

export default connect(
  null,
  { setNotification }
)(Blogs)
