import React from "react"

import Alert from "./component/alert"
import Blogs from "./component/blogs"
import blogService from "./service/blog_service"
import Form from "./component/form"
import loginService from "./service/login_service"

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      alert : null,
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
      this.setState({
        user,
        alert : { type : "success", message : "Login successful" }
      })

    } catch (ex) {
      this.setState({
        alert : { type : "fail", message : "Invalid username or password" }
      })
    }

    this.setState({ username : "", password : "" })
    setTimeout(() => {
      this.setState({ alert : null })
    }, 5000)
  }

  handleLogout = (e) => {
    e.preventDefault()

    blogService.setToken(null)
    window.localStorage.removeItem("loggedBlogged")

    this.setState({
      user : null,
      alert : { type : "success", message : "Now logged out" }
    })
    setTimeout(() => {
      this.setState({ alert : null })
    }, 5000)
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

    const blogs = () => (
      <div>
        <h2>Blogs</h2>
        <p>
          Logged in as {this.state.user.name}&nbsp;
          <button onClick={this.handleLogout}>Logout</button>
        </p>
        <Blogs />
      </div>
    )

    return (
      <div>
        <Alert alert={this.state.alert} />
        {this.state.user === null
          ? loginForm()
          : blogs()
        }
      </div>
    )
  }
}

export default App
