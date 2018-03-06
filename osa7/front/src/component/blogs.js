import React from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import Blog from "./blog"
import Form from "./form"
import Togglable from "./togglable"

import { addBlog, initBlogs } from "../reducer/blog_reducer"
import { setNotification } from "../reducer/notification_reducer"

class Blogs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
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
    this.props.initBlogs()
  }

  getBlogFromState = () => {
    let { title, author, url } = this.state

    if (!title || title.length < 3) throw new Error()
    if (!author || author.length < 3) throw new Error()
    if (!url || url.length < 3) throw new Error()

    return { title, author, url }
  }

  handleFormChange = (e) =>
    this.setState({ [e.target.name] : e.target.value })

  addBlog = async (e) => {
    e.preventDefault()

    try {
      let blog = this.getBlogFromState()
      this.props.addBlog(blog)

      this.addBlogForm.toggle()
      this.setState({ title : "", author : "", url : "" })
      this.props.setNotification("New blog added", "success", 5)

    } catch (ex) {
      this.props.setNotification("Check your inputs", "fail", 5)
    }
  }

  render() {
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
          {this.props.blogs.map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              user={this.state.user}
            />
          )}
        </div>
        <div>
          <h2>Add new blog</h2>
          <Togglable button="Add new blog" ref={c => this.addBlogForm = c}>
            <Form
              handleSubmit={this.addBlog}
              handleField={this.handleFormChange}
              fields={[
                { type : "text", name : "title", value : this.state.title },
                { type : "text", name : "author", value : this.state.author },
                { type : "text", name : "url", value : this.state.url }
              ]}
              submit="Add"
            />
          </Togglable>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    blogs : state.blogs
  }
}

export default connect(
  mapStateToProps,
  { addBlog, initBlogs, setNotification }
)(Blogs)
