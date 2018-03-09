import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

import BlogForm from "./blog_form"
import Togglable from "./togglable"

class BlogList extends React.Component {
  handleToggle = () => this.formToggler.toggle()

  render() {
    return(
      <div>
        <h2>Blogs</h2>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Likes</th>
            </tr>
          </thead>
          <tbody>
            {this.props.blogs.map(b =>
              <tr key={b.id}>
                <td>
                  <Link to={`/blogs/${b.id}`}>{b.title}</Link>
                </td>
                <td>{b.author}</td>
                <td>{b.likes}</td>
              </tr>
            )}
          </tbody>
        </table>
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

const mapStateToProps = (state) => ({ blogs : state.blogs })

export default connect(
  mapStateToProps
)(BlogList)
