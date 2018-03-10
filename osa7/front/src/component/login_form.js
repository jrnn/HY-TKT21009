import React from "react"
import { connect } from "react-redux"
import { Button, Form } from "semantic-ui-react"

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
        <h2 className="padded">Please provide credentials</h2>
        <Form onSubmit={this.handleLogin}>
          <Form.Field>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={this.state.username}
              onChange={this.handleFieldChange}
            />
          </Form.Field>
          <Form.Field>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleFieldChange}
            />
          </Form.Field>
          <Button content="Login" fluid />
        </Form>
      </div>
    )
  }
}

export default connect(
  null,
  { loginUser, setNotification }
)(LoginForm)
