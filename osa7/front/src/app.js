import React from "react"
import { connect } from "react-redux"

import Blogs from "./component/blogs"
import Form from "./component/form"
import Notification from "./component/notification"

import { setNotification } from "./reducer/notification_reducer"

import blogService from "./service/blog_service"
import loginService from "./service/login_service"

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      user : null,
      username : "",
      password : ""
    }
  }

  componentDidMount() {
    let user = window.localStorage.getItem("loggedBlogged")

    if (user) {
      user = JSON.parse(user)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  }

  handleFormChange = (e) => {
    this.setState({ [e.target.name] : e.target.value })
  }

  handleLogin = async (e) => {
    e.preventDefault()

    try {
      let user = await loginService
        .login({
          username : this.state.username,
          password : this.state.password
        })

      blogService.setToken(user.token)
      window.localStorage.setItem("loggedBlogged", JSON.stringify(user))
      this.setState({ user })

    } catch (ex) {
      this.props.setNotification("Invalid username or password", "fail", 5)
    }

    this.setState({ username : "", password : "" })
  }

  handleLogout = (e) => {
    e.preventDefault()

    blogService.setToken(null)
    window.localStorage.removeItem("loggedBlogged")

    this.props.setNotification("Now logged out", "success", 5)
    this.setState({ user : null })
  }

  render() {
    const loginForm = () => (
      <div>
        <h2>Please provide credentials</h2>
        <Form
          handleSubmit={this.handleLogin}
          handleField={this.handleFormChange}
          fields={[
            { type : "text", name : "username", value : this.state.username },
            { type : "password", name : "password", value : this.state.password }
          ]}
          submit="Login"
        />
      </div>
    )

    return (
      <div>
        <Notification />
        {this.state.user === null
          ? loginForm()
          : <Blogs user={this.state.user} handleLogout={this.handleLogout} />
        }
      </div>
    )
  }
}

export default connect(
  null,
  { setNotification }
)(App)
