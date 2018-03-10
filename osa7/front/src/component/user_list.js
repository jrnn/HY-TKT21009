import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { List } from "semantic-ui-react"

import Togglable from "./togglable"
import UserForm from "./user_form"

class UserList extends React.Component {
  handleToggle = () => this.formToggler.toggle()

  render () {
    return (
      <div>
        <h2 className="padded">Users</h2>
        <Togglable
          buttonLabel="Add new user"
          ref={component => this.formToggler = component}
        >
          <UserForm toggleForm={this.handleToggle} />
        </Togglable>
        <List divided relaxed>
          {this.props.users.map(u =>
            <List.Item key={u.id}>
              <List.Content>
                <List.Header>
                  <Link to={`/users/${u.id}`}>{u.name}</Link>
                </List.Header>
                <List.Description>
                  Added blogs: {u.blogs.length}
                </List.Description>
              </List.Content>
            </List.Item>
          )}
        </List>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({ users : state.users })

export default connect(
  mapStateToProps
)(UserList)
