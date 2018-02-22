import React from "react"
import Blog from "./component/blog"
import LoginForm from "./component/login_form"
import blogService from "./service/blog_service"
import loginService from "./service/login_service"

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      blogs : [],
      error : null,
      user : null,
      username : "",
      password : ""
    }
  }

  componentDidMount() {
    blogService
      .findAll()
      .then(blogs => this.setState({ blogs }))
  }

  handleFormChange = (event) => {
    this.setState({ [event.target.name] : event.target.value })
  }

  login = async (event) => {
    event.preventDefault()

    try {
      let user = await loginService
        .login({
          username : this.state.username,
          password : this.state.password
        })

      this.setState({ user })

    } catch (ex) {
      this.setState({ error : "invalid username or password" })
      setTimeout(() => {
        this.setState({ error : null })
      }, 5000)
    }

    this.setState({ username : "", password : "" })
  }

  render() {
    const loginForm = () => (
      <div>
        <h2>Please provide credentials</h2>
        <LoginForm
          login={this.login}
          handler={this.handleFormChange}
          username={this.state.username}
          password={this.state.password}
        />
      </div>
    )

    const blogList = () => (
      <div>
        <h2>Blogs</h2>
        <p>Logged in as {this.state.user.name}</p>
        <ul>
          {this.state.blogs.map(b =>
            <Blog key={b.id} blog={b} />
          )}
        </ul>
      </div>
    )

    return (
      <div>
        {this.state.user === null
          ? loginForm()
          : blogList()
        }
      </div>
    )
  }
}

export default App
