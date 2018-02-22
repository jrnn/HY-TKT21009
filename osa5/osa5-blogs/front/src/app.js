import React from "react"
import AddBlog from "./component/add_blog"
import Blog from "./component/blog"
import LoginForm from "./component/login_form"
import blogService from "./service/blog_service"
import loginService from "./service/login_service"

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      blogs : [],    // siirrä ehkä kaikki blogeihin liittyvä erilliseen "Blogs" komponenttiin?
      error : null,
      user : null,
      username : "",
      password : "",
      title : "",
      author : "",
      url : ""
    }
  }

  componentDidMount() {
    blogService
      .findAll()
      .then(blogs => this.setState({ blogs }))

    let user = window.localStorage.getItem("loggedBlogged")
    if (user) {
      user = JSON.parse(user)
      this.setState({ user })
      blogService.setToken(user.token)
    }
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
      blogService.setToken(user.token)
      window.localStorage.setItem("loggedBlogged", JSON.stringify(user))

    } catch (ex) {
      this.setState({ error : "invalid username or password" })
      setTimeout(() => {
        this.setState({ error : null })
      }, 5000)
    }

    this.setState({ username : "", password : "" })
  }

  logout = (event) => {
    event.preventDefault()
    this.setState({ user : null })
    window.localStorage.removeItem("loggedBlogged")
  }

  addBlog = async (event) => {
    event.preventDefault()

    try {
      let blog = await blogService
        .save({
          title : this.state.title,
          author : this.state.author,
          url : this.state.url
        })

      blog = await blogService.findOne(blog._id)
      this.setState({
        title : "", author : "", url : "",
        blogs : this.state.blogs.concat(blog)
      })

    } catch (ex) {
      this.setState({ error : "check your inputs" })
      setTimeout(() => {
        this.setState({ error : null })
      }, 5000)
    }
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
      <section>
        <div>
          <h2>Blogs</h2>
          <p>
            Logged in as {this.state.user.name}
            <button type="submit" onClick={this.logout}>Logout</button>
          </p>
          <ul>
            {this.state.blogs.map(b =>
              <Blog key={b.id} blog={b} />
            )}
          </ul>
        </div>
        <div>
          <h2>Add new blog</h2>
          <AddBlog
            add={this.addBlog}
            handler={this.handleFormChange}
            title={this.state.title}
            author={this.state.author}
            url={this.state.url}
          />
        </div>
      </section>
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
