import React from "react"
import { connect } from "react-redux"
import { Button, Segment } from "semantic-ui-react"
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
          <Button
            content="Delete!"
            onClick={e => this.handleDelete(e, blog.id)}
          />
        )
      else
        return null
    }

    const comments = () => {
      if (blog.comments.length > 0)
        return (
          <Segment.Group>
            {blog.comments.map(c =>
              <Segment
                key={c.timeStamp}
                content={c.comment}
              />
            )}
          </Segment.Group>
        )
      else
        return null
    }

    if (!blog)
      return null
    else
      return (
        <div>
          <h2 className="padded">{blog.title}</h2>
          <Segment.Group>
            <Segment>Authored by <strong>{blog.author}</strong></Segment>
            <Segment>
              More info at <a href={blog.url}>{blog.url}</a>
            </Segment>
            <Segment>{blog.likes} likes</Segment>
            <Segment>
              Added by <strong>{blog.user.name ? blog.user.name : "anonymous"}</strong>
            </Segment>
          </Segment.Group>
          <div>
            <Button content="I like this!" onClick={this.handleLike} />
            {deleteButton()}
          </div>
          <Segment.Group>
            <Segment><strong>Comments</strong></Segment>
            {comments()}
          </Segment.Group>
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
