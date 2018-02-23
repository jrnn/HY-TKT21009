import React from "react"

import AddBlog from "./add_blog"
import Alert from "./alert"
import Blog from "./blog"
import blogService from "../service/blog_service"

class Blogs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      alert : null,
      blogs : [],
      title : "",
      author : "",
      url : ""
    }
  }

  componentDidMount() {
    blogService
      .findAll()
      .then(blogs => this.setState({ blogs }))
  }

  handleFormChange = (e) => {
    this.setState({ [e.target.name] : e.target.value })
  }

  add = async (e) => {
    e.preventDefault()

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
        blogs : this.state.blogs.concat(blog),
        alert : { type : "success", message : "new blog added" }
      })

    } catch (ex) {
      this.setState({ alert :
        { type : "fail", message : "Check your inputs" }
      })
    }

    setTimeout(() => {
      this.setState({ alert : null })
    }, 5000)
  }

  render() {
    return(
      <div>
        <div>
          <ul>
            {this.state.blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )}
          </ul>
        </div>
        <div>
          <Alert alert={this.state.alert} />
          <h2>Add new blog</h2>
          <AddBlog
            add={this.add}
            handler={this.handleFormChange}
            title={this.state.title}
            author={this.state.author}
            url={this.state.url}
          />
        </div>
      </div>
    )
  }
}

export default Blogs
