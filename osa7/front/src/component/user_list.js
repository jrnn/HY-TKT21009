import React from "react"
import { connect } from "react-redux"

import { initUsers } from "../reducer/user_reducer"

class UserList extends React.Component {
  componentDidMount = () => this.props.initUsers()

  render() {
    console.log(this.props.users)
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
                <td>{u.name}</td>
                <td>{u.blogs.length}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({ users : state.users })

export default connect(
  mapStateToProps,
  { initUsers }
)(UserList)
