import React from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import { deleteBlog, likeBlog, setNotification } from "../reducer/actions"

class BlogDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = { key : 0 }
  }
  static propTypes = {
    id : PropTypes.string.isRequired
  }

  handleDelete = async (e, id) => {
    e.preventDefault()

    if (window.confirm("Are you sure fo' shizzle?")) {
      try {
        await this.props.deleteBlog(id)
        this.props.setNotification("Blog successfully deleted. Hooray!", "success", 5)
        this.props.history.push("/")

      } catch (ex) {
        this.props.setNotification("Dayum! Something went kaputt.", "fail", 5)
      }
    }
  }

  handleLike = async (e) => {
    e.preventDefault()
    await this.props.likeBlog(this.props.blog)
    this.setState({ key : Math.random() })
  }

  render() {
    let { auth, blog } = this.props

    const deleteButton = () => {
      let blogOwner = blog.user.username

      if (!blogOwner || blogOwner === auth.username )
        return (
          <button onClick={e => this.handleDelete(e, blog.id)}>
            Delete
          </button>
        )
      else
        return null
    }

    if (!blog)
      return null
    else
      return (
        <div>
          <h2>{blog.title}</h2>
          <h4>authored by {blog.author}</h4>
          <p>
            <a href={blog.url}>{blog.url}</a>
          </p>
          <p>
            {blog.likes} likes&nbsp;
            <button onClick={this.handleLike}>Like</button>
          </p>
          <p>
            Added by {blog.user.name ? blog.user.name : "anonymous"}
          </p>
          {deleteButton()}
        </div>
      )
  }
}

const mapStateToProps = (state, props) => {
  return {
    auth : state.auth,
    blog : state.blogs.find(b => b.id === props.id)
  }
}

export default connect(
  mapStateToProps,
  { deleteBlog, likeBlog, setNotification }
)(BlogDetails)
