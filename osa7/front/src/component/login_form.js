import React from "react"
import { connect } from "react-redux"

import FormField from "./form_field"
import { loginUser, setNotification } from "../reducer/actions"

class LoginForm extends React.Component {
  constructor() {
    super()
    this.state = { username : "", password : "" }
  }

  handleFieldChange = (e) =>
    this.setState({ [e.target.name] : e.target.value })

  handleLogin = async (e) => {
    e.preventDefault()
    let { username, password } = this.state

    try {
      await this.props.loginUser(username, password)
      this.props.setNotification("Now logged in. Welcome!", "success", 5)

    } catch (ex) {
      this.setState({ username : "", password : "" })
      this.props.setNotification("Invalid username or password.", "fail", 5)
    }
  }

  render() {
    return (
      <div>
        <h2>Please provide credentials</h2>
        <form onSubmit={this.handleLogin}>
          <table>
            <tbody>
              <FormField
                label="Username:"
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleFieldChange}
              />
              <FormField
                label="Password:"
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleFieldChange}
              />
              <tr>
                <td>
                  <button>Login</button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    )
  }
}

export default connect(
  null,
  { loginUser, setNotification }
)(LoginForm)
