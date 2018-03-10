import React from "react"
import { connect } from "react-redux"
import { NavLink } from "react-router-dom"
import { Menu } from "semantic-ui-react"

import { logoutUser, setNotification } from "../reducer/actions"

class NavBar extends React.Component {
  handleLogout = (e) => {
    e.preventDefault()
    this.props.logoutUser()
    this.props.setNotification("Now logged out. Bye bye!", "success", 5)
  }

  render() {
    return (
      <Menu>
        <Menu.Item>
          <NavLink exact to="/">Blogs</NavLink>
        </Menu.Item>
        <Menu.Item>
          <NavLink exact to="/users">Users</NavLink>
        </Menu.Item>
        <Menu.Item>
          <em>Logged in as {this.props.auth.name}</em>&nbsp;(&nbsp;
          <a href="/" onClick={this.handleLogout}>Logout</a>&nbsp;)
        </Menu.Item>
      </Menu>
    )
  }
}

const mapStateToProps = (state) => ({ auth : state.auth })

export default connect(
  mapStateToProps,
  { logoutUser, setNotification }
)(NavBar)
