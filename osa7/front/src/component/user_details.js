import React from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

class UserDetails extends React.Component {
  static propTypes = {
    id : PropTypes.string.isRequired
  }

  render() {
    const addedBlogs = (blogs) => {
      let i = 0

      return (
        <div>
          <h3>Added blogs</h3>
          <ul>
            {blogs.map(blog =>
              <li key={i++}>{blog.title} by {blog.author}</li>
            )}
          </ul>
        </div>
      )
    }

    let { user } = this.props

    if (!user)
      return null
    else
      return(
        <div>
          <h2>{user.name}</h2>
          {user.blogs.length === 0
            ? <h3>No blogs under this user&#39;s ownership!</h3>
            : addedBlogs(user.blogs)
          }
        </div>
      )
  }
}

const mapStateToProps = (state, props) =>
  ({ user : state.users.find(u => u.id === props.id) })

export default connect(
  mapStateToProps
)(UserDetails)
