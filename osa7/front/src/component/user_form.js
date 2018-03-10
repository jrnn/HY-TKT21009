import React from "react"
import { connect } from "react-redux"
import { Button, Form } from "semantic-ui-react"
import PropTypes from "prop-types"

import { addUser, setNotification } from "../reducer/actions"

class UserForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { username : "", name : "", password : "" }
  }
  static propTypes = {
    toggleForm : PropTypes.func.isRequired
  }

  getUserFromState = () => {
    let { username, name, password } = this.state

    if (!username || username.length < 3) throw new Error()
    if (!name || name.length < 3) throw new Error()
    if (!password || password.length < 3) throw new Error()

    return { username, name, password }
  }

  handleFieldChange = (e) =>
    this.setState({ [e.target.name] : e.target.value })

  handleAdd = async (e) => {
    e.preventDefault()

    try {
      let user = this.getUserFromState()
      await this.props.addUser(user)

      this.setState({ username : "", name : "", password : "" })
      this.props.toggleForm()
      this.props.setNotification("New user added. Happy hacking!", "success", 5)

    } catch (ex) {
      this.props.setNotification("Oops! Check your inputs.", "fail", 5)
    }
  }

  render () {
    return (
      <Form onSubmit={this.handleAdd} className="padded">
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
            type="text"
            name="name"
            placeholder="Name"
            value={this.state.name}
            onChange={this.handleFieldChange}
          />
        </Form.Field>
        <Form.Field>
          <input
            type="text"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleFieldChange}
          />
        </Form.Field>
        <Button content="Add" fluid />
      </Form>
    )
  }
}

export default connect(
  null,
  { addUser, setNotification }
)(UserForm)
