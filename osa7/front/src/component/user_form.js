import React from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import FormField from "./form_field"
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
      <form onSubmit={this.handleAdd}>
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
              label="Name:"
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleFieldChange}
            />
            <FormField
              label="Password:"
              type="text"
              name="password"
              value={this.state.password}
              onChange={this.handleFieldChange}
            />
            <tr>
              <td>
                <button>Add</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    )
  }
}

export default connect(
  null,
  { addUser, setNotification }
)(UserForm)
