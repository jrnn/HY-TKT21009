import React from "react"
import { connect } from "react-redux"
import { NavLink } from "react-router-dom"

import { logoutUser, setNotification } from "../reducer/actions"

class NavBar extends React.Component {
  handleLogout = (e) => {
    e.preventDefault()
    this.props.logoutUser()
    this.props.setNotification("Now logged out. Bye bye!", "success", 5)
  }

  render() {
    return (
      <div>
        <NavLink exact to="/">Blogs</NavLink>
        &nbsp;|&nbsp;
        <NavLink exact to="/users">Users</NavLink>
        &nbsp;|&nbsp;
        <em>Logged in as {this.props.auth.name}</em>
        &nbsp;
        <button onClick={this.handleLogout}>Logout</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({ auth : state.auth })

export default connect(
  mapStateToProps,
  { logoutUser, setNotification }
)(NavBar)
