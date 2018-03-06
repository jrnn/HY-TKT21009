import React from "react"
import { connect } from "react-redux"

import Blog from "./blog"
import BlogForm from "./blog_form"
import Togglable from "./togglable"
import { logoutUser } from "../reducer/auth_reducer"
import { initBlogs } from "../reducer/blog_reducer"
import { setNotification } from "../reducer/notification_reducer"

class BlogList extends React.Component {
  componentDidMount = () => this.props.initBlogs()

  handleToggle = () => this.formToggler.toggle()

  handleLogout = (e) => {
    e.preventDefault()
    this.props.logoutUser()
    this.props.setNotification("Now logged out. Bye bye!", "success", 5)
  }

  render() {
    return(
      <div>
        <div>
          <h2>Blogs</h2>
          <p>
            Logged in as {this.props.user.name}&nbsp;
            <button onClick={this.handleLogout}>Logout</button>
          </p>
        </div>
        <div>
          {this.props.blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
        <div>
          <h2>Add new blog</h2>
          <Togglable
            buttonLabel="Add new blog"
            ref={component => this.formToggler = component}
          >
            <BlogForm toggleForm={this.handleToggle} />
          </Togglable>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    blogs : state.blogs,
    user : state.user
  }
}

export default connect(
  mapStateToProps,
  { initBlogs, logoutUser, setNotification }
)(BlogList)
