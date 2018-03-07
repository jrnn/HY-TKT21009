import React from "react"
import { connect } from "react-redux"

import Blog from "./blog"
import BlogForm from "./blog_form"
import Togglable from "./togglable"
import { logoutUser, setNotification } from "../reducer/actions"

class BlogList extends React.Component {
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
            Logged in as {this.props.auth.name}&nbsp;
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
    auth : state.auth,
    blogs : state.blogs
  }
}

export default connect(
  mapStateToProps,
  { logoutUser, setNotification }
)(BlogList)
