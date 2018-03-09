import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

import Togglable from "./togglable"
import UserForm from "./user_form"

class UserList extends React.Component {
  handleToggle = () => this.formToggler.toggle()

  render () {
    return (
      <div>
        <h2>Users</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Blogs added</th>
            </tr>
          </thead>
          <tbody>
            {this.props.users.map(u =>
              <tr key={u.id}>
                <td>
                  <Link to={`/users/${u.id}`}>{u.name}</Link>
                </td>
                <td>{u.blogs.length}</td>
              </tr>
            )}
          </tbody>
        </table>
        <div>
          <h2>Add new user</h2>
          <Togglable
            buttonLabel="Add new user"
            ref={component => this.formToggler = component}
          >
            <UserForm toggleForm={this.handleToggle} />
          </Togglable>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({ users : state.users })

export default connect(
  mapStateToProps
)(UserList)
