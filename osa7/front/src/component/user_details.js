import React from "react"
import { connect } from "react-redux"
import { Segment } from "semantic-ui-react"
import PropTypes from "prop-types"

class UserDetails extends React.Component {
  static propTypes = {
    id : PropTypes.string.isRequired
  }

  render() {
    let i = 0
    let { user } = this.props

    const noBlogs = () => (
      <Segment textAlign="center">
        <em>No blogs under this user&#39;s ownership!</em>
      </Segment>
    )

    const addedBlogs = (blogs) => (
      <Segment>
        <h3>Added blogs</h3>
        <Segment.Group>
          {blogs.map(blog =>
            <Segment key={i++}>
              <em>{blog.title}</em> by {blog.author}
            </Segment>
          )}
        </Segment.Group>
      </Segment>
    )

    if (!user)
      return null
    else
      return(
        <div>
          <h2 className="padded">{user.name}</h2>
          <Segment.Group>
            {user.blogs.length === 0
              ? noBlogs()
              : addedBlogs(user.blogs)
            }
          </Segment.Group>
        </div>
      )
  }
}

const mapStateToProps = (state, props) =>
  ({ user : state.users.find(u => u.id === props.id) })

export default connect(
  mapStateToProps
)(UserDetails)
