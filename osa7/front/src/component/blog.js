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
    blog : PropTypes.object.isRequired
  }

  handleToggle = () => this.setState({ details : !this.state.details })

  handleDelete = async (e, id) => {
    e.preventDefault()

    if (window.confirm("Are you sure fo' shizzle?")) {
      try {
        await this.props.deleteBlog(id)
        this.props.setNotification("Blog successfully deleted. Hooray!", "success", 5)

      } catch (ex) {
        this.props.setNotification("Dayum! Something went wrong.", "fail", 5)
      }
    }
  }

  handleLike = async (e) => {
    e.preventDefault()
    await this.props.likeBlog(this.props.blog)
    this.setState({ key : Math.random() })
  }

  render() {
    let { blog, user } = this.props
    let details = { display : this.state.details ? "" : "none" }

    const deleteButton = () => {
      let blogOwner = blog.user.username

      if (!blogOwner || blogOwner === user.username ) {
        return (
          <div className="blog-entry-details">
            <button onClick={e => this.handleDelete(e, blog.id)}>
              Delete
            </button>
          </div>
        )
      }

      return(<div className="blog-entry-details"></div>)
    }

    return (
      <div className="blog-entry">
        <div
          onClick={this.handleToggle}
          style={{ cursor : "pointer" }}
        >{blog.title} ({blog.author})</div>
        <div style={details}>
          <div className="blog-entry-details">
            <a href={blog.url}>{blog.url}</a>
          </div>
          <div className="blog-entry-details">
            {blog.likes} likes&nbsp;
            <button onClick={this.handleLike}>Like</button>
          </div>
          <div className="blog-entry-details">
            Added by {blog.user.name ? blog.user.name : "anonymous"}
          </div>
          {deleteButton()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({ user : state.user })

export default connect(
  mapStateToProps,
  { deleteBlog, likeBlog, setNotification }
)(Blog)
