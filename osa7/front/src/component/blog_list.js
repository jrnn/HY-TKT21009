import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { List } from "semantic-ui-react"

import BlogForm from "./blog_form"
import Togglable from "./togglable"

class BlogList extends React.Component {
  handleToggle = () => this.formToggler.toggle()

  render() {
    return (
      <div>
        <h2 className="padded">Blogs</h2>
        <Togglable
          buttonLabel="Add new blog"
          ref={component => this.formToggler = component}
        >
          <BlogForm toggleForm={this.handleToggle} />
        </Togglable>
        <List divided relaxed>
          {this.props.blogs.map(b =>
            <List.Item key={b.id}>
              <List.Content>
                <List.Header>
                  <Link to={`/blogs/${b.id}`}>{b.title}</Link>
                </List.Header>
                <List.Description>
                  Authored by {b.author} ({b.likes} likes)
                </List.Description>
              </List.Content>
            </List.Item>
          )}
        </List>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({ blogs : state.blogs })

export default connect(
  mapStateToProps
)(BlogList)
