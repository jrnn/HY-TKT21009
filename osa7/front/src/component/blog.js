import React from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import { deleteBlog, likeBlog } from "../reducer/blog_reducer"
import { setNotification } from "../reducer/notification_reducer"

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = { details : false, key : 0 }
  }
  static propTypes = {
    blog : PropTypes.object.isRequired,
    user : PropTypes.object.isRequired
  }

  toggle = () => {
    this.setState({ details : !this.state.details })
  }

  remove = async (id) => {
    if (window.confirm("Are you sure fo' shizzle?")) {
      try {
        this.props.deleteBlog(id)
        this.props.setNotification("Blog successfully deleted", "success", 5)

      } catch (ex) {
        this.props.setNotification("Dayum! Something went wrong", "fail", 5)
      }
    }
  }

  render() {
    let { blog } = this.props

    let cursor = { cursor : "pointer" }
    let details = { display : this.state.details ? "" : "none" }

    const deleteButton = () => {
      let blogOwner = blog.user.username

      if (!blogOwner || blogOwner === this.props.user.username ) {
        return (
          <div className="blog-entry-details">
            <button onClick={() => this.remove(blog.id)}>
              Delete
            </button>
          </div>
        )
      }

      return(<div className="blog-entry-details"></div>)
    }

    return (
      <div className="blog-entry">
        <div onClick={this.toggle} style={cursor} className="tests-header">
          {blog.title} ({blog.author})
        </div>
        <div style={details} className="tests-details">
          <div className="blog-entry-details">
            <a href={blog.url}>{blog.url}</a>
          </div>
          <div className="blog-entry-details">
            {blog.likes} likes&nbsp;
            <button onClick={() => {
              this.props.likeBlog(this.props.blog)
              this.setState({ key : Math.random() })
            }}>Like</button>
          </div>
          <div className="blog-entry-details">
            added by {blog.user.name ? blog.user.name : "anonymous"}
          </div>
          {deleteButton()}
        </div>
      </div>
    )
  }
}

export default connect(
  null,
  { deleteBlog, likeBlog, setNotification }
)(Blog)
